from django.shortcuts import render,redirect
import oracledb as db
from django.core.paginator import Paginator

# Create your views here.
def index(request):
    user_name = request.session.get('name')
    
    msg = request.session.pop('msg', None)

    if request.method == 'POST':
        user = request.session['user_id']
        title = request.POST.get('title')
        content = request.POST.get('content')
        search = request.POST.get('search')

        con = db.connect(dsn='localhost:1521/xe',user='C##blog',password='1234')
        cursor = con.cursor()
        cursor.execute("INSERT INTO post(title,content,writer,user_id) VALUES (:1,:2,:3,:4)",[title, content, user_name, user])
        con.commit() 

    con = db.connect(dsn='localhost:1521/xe',user='C##blog',password='1234')
    cursor = con.cursor()
    cursor.execute("SELECT * FROM post ORDER BY ID desc")
    row = cursor.fetchall()

    page = request.GET.get('page', '1')
    paginator = Paginator(row, 4)
    page_obj = paginator.get_page(page)

    cursor.close()
    con.close()

    return render(request, 'index.html', 
                  {'posts': page_obj ,  'user_name':user_name , 'msg': msg})




def post(request):
    # 로그인 체크 정보가 있으면 글작성 o , 없을 시 알람창 출력 후 index페이지 출력
    if not request.session.get('name'):
        request.session['msg'] = '로그인 후 사용 가능합니다'
        return redirect('/') 

    if request.method == 'POST':
        user_name = request.session.get('name')
        title = request.POST.get('title')
        content = request.POST.get('content')
        user = request.session['user_id']
        
        con = db.connect(dsn='localhost:1521/xe', user='C##blog', password='1234')
        cursor = con.cursor()
        cursor.execute("INSERT INTO post(title, content, writer,user_id) VALUES (:1, :2, :3, :4)", [title, content, user_name, user])
        con.commit()
        cursor.close()
        con.close()
        return redirect('/') 

    return render(request, 'post.html')



def post_detail(request, id):
    if request.session.get('name'):
        user = request.session['user_id']
        con = db.connect(dsn='localhost:1521/xe',user='C##blog',password='1234')
        cursor = con.cursor()
        cursor.execute("SELECT * FROM post WHERE id = :1",[id])
        row = cursor.fetchall()

        cursor.close()
        con.close()
        return render(request, 'post_detail.html',{'posts': row,'user':user})
    else :
        con = db.connect(dsn='localhost:1521/xe',user='C##blog',password='1234')
        cursor = con.cursor()
        cursor.execute("SELECT * FROM post WHERE id = :1",[id])
        row = cursor.fetchall()
        
        cursor.close()
        con.close()
        return render(request, 'post_detail.html',{'posts': row})


def login(request):
    if request.method == "POST":
        id = request.POST.get("user_id")
        pw = request.POST.get("user_pw")


        try:   
            # 로그인 시 회원정보 조회
            con = db.connect(dsn="localhost:1521/xe", user="C##blog", password="1234")
            cursor = con.cursor()
            
            sql = "SELECT * FROM JOIN WHERE TRIM(USER_ID) = :1 AND TRIM(USER_PW) = :2"
            cursor.execute(sql, (id, pw))
            user_data = cursor.fetchone()

            cursor.close()
            con.close()

            if user_data:
                request.session['name'] = user_data[1]
                request.session['user_id'] = user_data[2]
                return redirect('/')
            else:
                return render(request, "login.html", {"msg": "로그인 실패"})

        except db.DatabaseError as e:
            return render(request, "index.html")

    return render(request, "login.html")


def join(request):

    if request.method == "POST":
            name = request.POST.get("name")
            id = request.POST.get("user_id")
            pw = request.POST.get("user_pw")
            birth = request.POST.get("birth")
            phonenum = request.POST.get("phonenum")
            postcode = request.POST.get("postcode")
            roadname = request.POST.get("roadname")
            address = request.POST.get("address")

            
                #회원가입 시 빈공간 x
            if not all([name, id, pw, birth, phonenum,postcode,roadname,address]):
                return render(request, "join.html", {"msg": "빈 공간 작성 부탁드립니다"})
            try:
                con = db.connect(dsn="localhost:1521/xe", user="C##blog", password="1234")
                cursor = con.cursor()

                # 아이디 중복 처리
                check_id = "SELECT USER_ID FROM JOIN WHERE TRIM(USER_ID) = :1"
                cursor.execute(check_id, (id,))
                user_data = cursor.fetchone()

                if user_data:
                    cursor.close()
                    con.close()
                    return render(request, "join.html", {"msg": "이미 존재하는 아이디입니다."})
                
                # 회원가입 정보 데이터 db에 저장
                sql = """ INSERT INTO JOIN ( NAME, USER_ID, USER_PW, BIRTH,PHONENUM,POSTCODE,ROADNAME,ADDRESS) VALUES ( :1, :2, :3, :4, :5, :6 ,:7 ,:8)"""
                cursor.execute(sql, (name, id, pw, birth, phonenum,postcode,roadname,address))
                
                con.commit()

                cursor.close()
                con.close()

            
                return redirect('/login/')

            except db.DatabaseError as e:
                return render(request, "join.html" ,{"msg": f"오류발생: {e}"})

    return render(request, "join.html")
#세션 삭제
def logout(request):
    request.session.flush() 
    return redirect('/')

#게시물 삭제
def delete(request,id):

    con = db.connect(dsn='localhost:1521/xe',user='C##blog',password='1234')
    cursor = con.cursor()
    cursor.execute("DELETE FROM post WHERE id=:1",[id])
    con.commit()

    cursor.close()
    con.close()

    return redirect('/')
    