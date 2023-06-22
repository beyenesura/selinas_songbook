from flask import Flask,request,jsonify
from flask_cors import CORS, cross_origin
import sqlite3
import bcrypt
import jwt
from functools import wraps




from flask import Flask











app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4Njc5MTc1NiwiaWF0IjoxNjg2NzkxNzU2fQ.mnh2azjgyGM4JByhfSPxAcTHjEL8kuZv-6V-y5V3AaQ'

#TODO Integrate JWT/Oauth

def get_db_connection():
    
    conn = sqlite3.connect('database.db')
    return conn

def verifyUser(user, password):

    conn = get_db_connection()
    cur = conn.cursor()
    (passToCheck,) = cur.execute('Select password from users where username=?',(user,)).fetchone()

    
    if(len(passToCheck) == 0):
        return False
    #checks against hashed pw from db

    checker = password.encode('utf-8')
    
    result = bcrypt.checkpw(checker,passToCheck)

    return result

# decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):


        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
        try:
            # decoding the payload to fetch the stored details
            conn = get_db_connection()
            cur = conn.cursor()
            data = jwt.decode(token, app.config['SECRET_KEY'],algorithms=['HS256'])
            current_user = cur.execute('SELECT * FROM USERS where username=?',(data['user'],)).fetchone()
        except Exception as e:
            return jsonify({
                'message' : 'Token is invalid !!',
                'data':data,
                'exception':e
            }), 401
        # returns the current logged in users context to the routes
        return f(current_user, *args, **kwargs)


    return decorated

'''

LOGIN/REGISTER ROUTES

'''
@app.route("/login", methods=['POST'])
@cross_origin()
def login():
    
    content = request.get_json(silent=True)
    if(verifyUser(content['username'],content['password']) == False):
        return 'Incorrect user/pass '
    else:
        token = jwt.encode({'user': content['username']}, app.config['SECRET_KEY'],algorithm="HS256")
        return {"response":token}




@app.route("/register", methods=['POST'])
@cross_origin()
def register():
    
    content = request.get_json(silent=True)
    username=content['username']
    conn = get_db_connection()
    cur = conn.cursor()
    possibleUsers = cur.execute('Select * from users where username=?',(username,)).fetchall()
    if(len(possibleUsers) == 0):
        
        

        #hash what the user gives you
        password = content['password']
        passbytes = password.encode('utf-8')
        hashedword = bcrypt.hashpw(passbytes,bcrypt.gensalt())
    
    
        cur.execute("Insert into users (username, password) VALUES (?,?)",(username,hashedword))
        conn.commit()

        return {'response':'Successfully created account'}
    else:
        return {'response':'Username taken'}

'''

READ ROUTES

'''

#Get all Songs
@app.route("/get_songs")
@cross_origin()
@token_required
def get_songs(user):
    conn = get_db_connection()
    cur = conn.cursor()
    a,b,c,d,e = user

    if e==True:
        cur.execute('SELECT * FROM songs')
        rows = cur.fetchall()
        return jsonify({"response":rows})
    else:
        cur.execute('SELECT * FROM songs where author=?',(c,))
        rows = cur.fetchall()
        return jsonify({"response":rows})





#Get song by name
@app.route("/get_song")
@cross_origin()
@token_required
def get_song(user):
    conn = get_db_connection()
    cur = conn.cursor()
    content = request.args.get('song')
    data = cur.execute('SELECT * FROM songs WHERE title = ?',(content,)).fetchone()
    return jsonify({"response":data})





'''
CREATE ROUTES
'''


@app.route('/add_song', methods=['POST'])
@cross_origin()
@token_required
def add_song(name):
    
    
    #data is a dict of key_value pairs
    content = request.get_json()
            
    try:

        #check that it has all of the requirements. a title,author, and lyrics
        title = content['title']
        author = content['author']
        lyrics = content['lyrics']


        #check that name of song does not exist already
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM songs WHERE title = ?',(title,))
        data = cur.fetchall()

        if data!=[]:
            raise Exception('This song exists already')

        


        #add the song
        cur.execute("INSERT INTO songs (title, author,lyrics) VALUES (?,?,?)",(title,author,lyrics))
        conn.commit()
        cur.execute('SELECT * FROM songs WHERE title = ?',(title,))
        data = cur.fetchall()
        return jsonify({"response":data,"success":True})

    except Exception as e:
        return jsonify({"response":str(e),"success":False})


'''
UPDATE ROUTE
'''

@app.route('/edit_song',methods=['POST'])
@cross_origin()
@token_required
def edit_song(name):
    
    

     
    try:
        content = request.get_json()
        a,b,c,d,e = name       
        #check that it has all of the requirements. a title,author, and lyrics
        title = content['title']
        author = content['author']
        lyrics = content['lyrics']



        if e==True:
            #check that name of song does not exist already
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute('SELECT * FROM songs WHERE title = ?',(title,))
            data = cur.fetchall()

            if data==[]:
                raise Exception('This song does not exist or you do not have access to edit this song')

        


            #add the song
            cur.execute("update songs set author=?,lyrics=? where title=?",(author,lyrics,title))
            conn.commit()
            cur.execute('SELECT * FROM songs WHERE title = ?',(title,))
            data = cur.fetchall()
            return jsonify({"response":data,"success":True})



        else:
            #check that name of song does not exist already
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute('SELECT * FROM songs WHERE title = ? and author=?',(title,c))
            data = cur.fetchall()

            if data==[]:
                raise Exception('This song does not exist or you do not have access to edit this song')

        


            #add the song
            cur.execute("update songs set author=?,lyrics=? where title=?",(author,lyrics,title))
            conn.commit()
            cur.execute('SELECT * FROM songs WHERE title = ?',(title,))
            data = cur.fetchall()
            return jsonify({"response":data,"success":True})









    except Exception as e:
        return jsonify({"response":str(e),"success":False})




'''
DELETE ROUTE
'''

@app.route('/delete_song',methods=['DELETE'])
@cross_origin()
@token_required
def delete_song(name):


    try:
         #data is a dict of key_value pairs
        content = request.get_json()
        a,b,c,d,e = name
        #check that it has all of the requirements. a title,author, and lyrics
        title = content['title']

        if e==True:
            #check that name of song does not exist already
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute('SELECT * FROM songs WHERE title = ?',(title,))
            data = cur.fetchall()

            if data==[]:
                raise Exception('This song does not exist or you do not have access to delete this song')
        else:
            #check that name of song does not exist already
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute('SELECT * FROM songs WHERE title = ? and author=?',(title,c))
            data = cur.fetchall()

            if data==[]:
                raise Exception('This song does not exist or you do not have access to delete this song')

        


        #add the song
        cur.execute("delete from songs where title=?",(title,))
        conn.commit()
        cur.execute('SELECT * FROM songs WHERE title = ?',(title,))
        data = cur.fetchall()
        return jsonify({"response":data,"success":True})

    except Exception as e:
        return jsonify({"response":str(e),"success":False})
