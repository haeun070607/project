from django.shortcuts import render, redirect
import oracledb as db 

def index(request):
    return render(request, "index.html", {"A": request})

def Hello(request):
    return render(request, "Hello.html")

def login(request):
    if request.method == "POST":
        id = request.POST.get("user_id")
        pw = request.POST.get("user_pw")


        try:
            con = db.connect(dsn="192.168.1.46:1521/xe", user="C##blog", password="1234")
            cursor = con.cursor()
            
            sql = "SELECT * FROM JOIN WHERE TRIM(USER_ID) = :1 AND TRIM(USER_PW) = :2"
            cursor.execute(sql, (id, pw))
            user_data = cursor.fetchone()

            cursor.close()
            con.close()

            if user_data:
                return redirect('/Hello') 
            else:
                return render(request, "login.html", {"msg": "로그인 실패"})

        except db.DatabaseError as e:
            return render(request, "login.html")

    return render(request, "login.html")


def join(request):

    if request.method == "POST":
            name = request.POST.get("name")
            id = request.POST.get("user_id")
            pw = request.POST.get("user_pw")
            birth = request.POST.get("birth")
            phonenum = request.POST.get("phonenum")
            adress = request.POST.get("adress")

    
            try:
                con = db.connect(dsn="192.168.1.46:1521/xe", user="C##blog", password="1234")
                cursor = con.cursor()


                check_id = "SELECT USER_ID FROM JOIN WHERE TRIM(USER_ID) = :1"
                cursor.execute(check_id, (id,))
                user_data = cursor.fetchone()

                if user_data:
                    cursor.close()
                    con.close()
                    return render(request, "join.html", {"msg": "이미 존재하는 아이디입니다."})
                
                
                sql = """ INSERT INTO JOIN (NUM, NAME, USER_ID, USER_PW, BIRTH,PHONENUM, ADRESS) VALUES (JOINSEQ.NEXTVAL, :1, :2, :3, :4, :5, :6)"""
                cursor.execute(sql, (name, id, pw, birth, phonenum, adress))
                
                con.commit()

                cursor.close()
                con.close()

            
                return redirect('/login/')

            except db.DatabaseError as e:
                return render(request, "join.html" ,{"msg": f"오류발생: {e}"})

    return render(request, "join.html")
    


