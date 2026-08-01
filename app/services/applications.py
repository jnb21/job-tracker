def create_application(conn, data, user_id: int):
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

def list_applications(conn, user_id: int):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT id, user_id, company, role, status, notes, applied_date, created_at FROM applications WHERE user_id = %s ORDER BY created_at DESC",
            (user_id,)
        )
        return cur.fetchall()

def get_application(conn, application_id: int, user_id: int):
    with conn.cursor() as cur:
        cur.execute(
            "SELECT id, user_id, company, role, status, notes, applied_date, created_at FROM applications WHERE id = %s AND user_id = %s",
            (application_id, user_id)
        )
        return cur.fetchone()

def update_application(conn, application_id: int, data, user_id: int):
    with conn.cursor() as cur:
        cur.execute(
            """
            UPDATE applications
            SET company = %s, role = %s, status = %s, notes = %s, updated_at = now()
            WHERE id = %s AND user_id = %s
            RETURNING id, user_id, company, role, status, notes, applied_date, created_at, updated_at
            """,
            (data.company, data.role, data.status, data.notes, application_id, user_id)
        )
        row = cur.fetchone()
        conn.commit()
        return row

def delete_application(conn, application_id: int, user_id: int):
    with conn.cursor() as cur:
        cur.execute(
            "DELETE FROM applications WHERE id = %s AND user_id = %s RETURNING id",
            (application_id, user_id)
        )
        row = cur.fetchone()
        conn.commit()
        return row