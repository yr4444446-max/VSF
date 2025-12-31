from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def db():
    return sqlite3.connect("startup.db")

@app.route("/register", methods=["POST"])
def register():
    data = request.form

    conn = db()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO startup_registration 
        (first_name, last_name, email, startup_name, startup_stage, industry, about_startup)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        data["firstName"],
        data["lastName"],
        data["email"],
        data["startupName"],
        data["startupStage"],
        data["industry"],
        data["aboutStartup"]
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Startup Registered Successfully"})

# VISITOR
@app.route("/visitor", methods=["POST"])
def visitor():
    d = request.form
    conn = db()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO visitors
        (first_name, last_name, country_code, mobile, email, pin_code)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        d["firstName"], d["lastName"], d["code"],
        d["mobile"], d["email"], d["pin"]
    ))
    conn.commit()
    conn.close()
    return "Visitor Registered Successfully"

# INVESTOR
@app.route("/investor", methods=["POST"])
def investor():
    d = request.form
    conn = db()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO investors
        (first_name, last_name, country_code, mobile, email, investor_type, residence_pin, office_pin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        d["firstName"], d["lastName"], d["code"],
        d["mobile"], d["email"], d["type"],
        d["rpin"], d["opin"]
    ))
    conn.commit()
    conn.close()
    return "Investor Registered Successfully"

# MENTOR
@app.route("/mentor", methods=["POST"])
def mentor():
    d = request.form
    conn = db()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO mentors
        (first_name, last_name, country_code, mobile, email, company, role, expertise, residence_pin, office_pin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        d["firstName"], d["lastName"], d["code"],
        d["mobile"], d["email"],
        d["company"], d["role"], d["expertise"],
        d["rpin"], d["opin"]
    ))
    conn.commit()
    conn.close()
    return "Mentor Registered Successfully"

if __name__ == "__main__":
    app.run(debug=True)
