from flask import Flask,request,jsonify
import sqlite3
import bcrypt
import jwt
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4Njc5MTc1NiwiaWF0IjoxNjg2NzkxNzU2fQ.mnh2azjgyGM4JByhfSPxAcTHjEL8kuZv-6V-y5V3AaQ'

#TODO Integrate JWT/Oauth

def get_db_connection():
    
    conn = sqlite3.connect('database.db')
    return conn

def verifyUser(user, password):
    
    #hash what the user gives you
    passbytes = password.encode('utf-8')

    salt = bcrypt.gensalt()
    
    hashedword = bcrypt.hashpw(passbytes, salt)
    
    #lookup user in db, compare hashed passwords
    
    conn = get_db_connection()
    cur = conn.cursor()
    passToCheck = cur.execute('Select password from users where user =' + user + ';').fetchall()

    
    if(len(passToCheck) == 0):
        return False
    #checks against hashed pw from db
    result = bcrypt.checkpw(passToCheck)

    return result

# decorator for verifying the JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query\
                .filter_by(public_id = data['public_id'])\
                .first()
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users context to the routes
        return  f(current_user, *args, **kwargs)

    return decorated

'''

LOGIN/REGISTER ROUTES

'''
@app.route("/login", methods=['POST'])
def login():
    data = request.json
    if(verifyUser(data['user'], data['password']) == False):
        return 'Incorrect user/pass '
    else:
        token = jwt.encode({
            'user': data['user'] 
        }, app.config['SECRET_KEY'])
        return 'Successfully logged in'

@app.route("/register", methods=['POST'])
def register():
    data = request.json
    
    conn = get_db_connection()
    cur = conn.cursor()
    possibleUsers = cur.execute('Select * from users where user=' + user + ';').fetchall()
    
    if(len(possibleUsers) == 0):
        
        user = data['user']
        password = data['password']
    
        cur.execute("Insert into users (user, pass) VALUES("+ user + "," + password + ");")
        
        return 'Successfully created account'
    else:
        return 'Username taken'

'''

READ ROUTES

'''

#Get all Songs
@app.route("/get_songs")
@token_required
def get_songs():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM songs')
    rows = cur.fetchall()
    return rows

#Get song by name
@app.route("/get_song/<string:name>")
@token_required
def get_song(name=None):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM songs WHERE title = ?',[name])
    data = cur.fetchall()
    return data





'''
CREATE ROUTES
'''


@app.route('/add_song', methods=['POST'])
@token_required
def add_song():
    
    
    #data is a dict of key_value pairs
    data = request.json
            
    try:

        #check that it has all of the requirements. a title,author, and lyrics
        title = data['title']
        author = data['author']
        lyrics = data['lyrics']


        #check that name of song does not exist already
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM songs WHERE title = ?',[title])
        data = cur.fetchall()

        if data!=[]:
            raise Exception('This song exists already')

        


        #add the song
        cur.execute("INSERT INTO songs (title, author,lyrics) VALUES (?,?,?)",(title,author,lyrics))
        conn.commit()
        cur.execute('SELECT * FROM songs WHERE title = ?',[title])
        data = cur.fetchall()
        return data

    except Exception as e:
        return str(e.args)


'''
UPDATE ROUTE
'''

@app.route('/edit_song',methods=['POST'])
@token_required
def edit_song():
    
    

    #data is a dict of key_value pairs
    data = request.json
    


    try:

        #check that it has all of the requirements. a title,author, and lyrics
        title = data['title']
        new_title = data['new_title']
        author = data['author']
        lyrics = data['lyrics']



        #check that name of song exists
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM songs WHERE title = ?',[title])
        data = cur.fetchall()

        if data==[]:
            raise Exception('There is no song like this')

        


        #add the song
        cur.execute("UPDATE songs SET title=?,author=?,lyrics=? WHERE title=?",(new_title,author,lyrics,title))
        conn.commit()
        cur.execute('SELECT * FROM songs WHERE title = ?',[new_title])
        data = cur.fetchall()
        return data


    except Exception as e:
        return str(e.args)



'''
DELETE ROUTE
'''

@app.route('/delete_song',methods=['DELETE'])
@token_required
def delete_song():
 
    #data is a dict of key_value pairs
    data = request.json
    


    try:

        #check that it has all of the requirements. a title,author, and lyrics
        title = data['title']



        #check that name of song exists
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM songs WHERE title = ?',[title])
        data = cur.fetchall()

        if data==[]:
            raise Exception('There is no song like this')

        

        #add the song
        cur.execute("DELETE FROM songs WHERE title=?",(title,))
        conn.commit()
        cur.execute('SELECT * FROM songs WHERE title = ?',[title])
        data = cur.fetchall()
        return data


    except Exception as e:
        return str(e.args)

