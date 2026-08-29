"""Seed (or refresh) a demo account so recruiters can try the app without registering.

Usage:
    python -m app.seed_demo

Reads DATABASE_URL the same way the API does, so it can be run against local
Docker Compose or pointed at the production database by setting DATABASE_URL
before invoking it. Safe to run repeatedly: it upserts the demo user and
resets their sample applications each time.
"""
from app.database import connection_pool
from app.services.auth import hash_password

DEMO_EMAIL = "demo@example.com"
DEMO_PASSWORD = "demo1234"

SAMPLE_APPLICATIONS = [
    ("Stripe", "Backend Engineer Intern", "interview", "Onsite loop scheduled for next week."),
    ("Shopify", "Software Developer Intern", "online_assessment", "OA due Friday."),
    ("Coinbase", "Platform Engineer Intern", "applied", "Referral submitted via alumni network."),
    ("Notion", "Full Stack Intern", "offer", "Offer received, deciding by end of month."),
    ("Palantir", "Forward Deployed Engineer Intern", "rejected", "Rejected after phone screen."),
]


def seed():
    conn = connection_pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO users (email, hashed_password)
                VALUES (%s, %s)
                ON CONFLICT (email) DO UPDATE SET hashed_password = EXCLUDED.hashed_password
                RETURNING id
                """,
                (DEMO_EMAIL, hash_password(DEMO_PASSWORD)),
            )
            user_id = cur.fetchone()["id"]

            cur.execute("DELETE FROM applications WHERE user_id = %s", (user_id,))
            for company, role, status, notes in SAMPLE_APPLICATIONS:
                cur.execute(
                    """
                    INSERT INTO applications (user_id, company, role, status, notes, applied_date)
                    VALUES (%s, %s, %s, %s, %s, now())
                    """,
                    (user_id, company, role, status, notes),
                )
        conn.commit()
        print(f"Seeded demo user '{DEMO_EMAIL}' with {len(SAMPLE_APPLICATIONS)} sample applications.")
    finally:
        connection_pool.putconn(conn)


if __name__ == "__main__":
    seed()
