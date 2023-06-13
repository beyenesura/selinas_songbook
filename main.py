from flask import Flask,request,jsonify
import sqlite3
import bcrypt

app = Flask(__name__)


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
    
    result = bcrypt.checkpw(passToCheck)

    return result


'''

READ ROUTES

'''

#Get all Songs
@app.route("/get_songs")
def get_songs():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM songs')
    rows = cur.fetchall()
    return rows

#Get song by name
@app.route("/get_song/<string:name>")
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
def add_song():
    
    
    #data is a dict of key_value pairs
    data = request.json
    
    if(verifyUser(data['user'], data['password']) == False):
        return 'Incorrect user/pass '
        
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
def edit_song():
    
    if(verifyUser(data['user'], data['password']) == False):
        return 'Incorrect user/pass '


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
def delete_song():

    if(verifyUser(data['user'], data['password']) == False):
        return 'Incorrect user/pass '

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

