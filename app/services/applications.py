def create_application(conn, data, user_id: int = 1):
    with conn.cursor() as cur:
        cur.execute(
            """
            INSERT INTO applications (user_id, company, role, status, notes)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, user_id, company, role, status, notes, applied_date, created_at
            """,
            (user_id, data.company, data.role, data.status, data.notes)
        )
        row = cur.fetchone()
        conn.commit()
        return row