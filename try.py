import sqlite3

conn = sqlite3.connect("startup.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS startup_registration (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    startup_name TEXT,
    startup_stage TEXT,
    industry TEXT,
    about_startup TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS visitors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    country_code TEXT,
    mobile TEXT,
    email TEXT,
    pin_code TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS investors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    country_code TEXT,
    mobile TEXT,
    email TEXT,
    investor_type TEXT,
    residence_pin TEXT,
    office_pin TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS mentors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    country_code TEXT,
    mobile TEXT,
    email TEXT,
    company TEXT,
    role TEXT,
    expertise TEXT,
    residence_pin TEXT,
    office_pin TEXT
)
""")



conn.commit()
conn.close()

print("Database & table created")
