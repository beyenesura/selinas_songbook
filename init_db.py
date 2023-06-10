import sqlite3

connection = sqlite3.connect('database.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()


author = 'SomePerson'
lyrics = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et feugiat massa. Pellentesque sodales iaculis diam, eu varius nulla. Sed cursus justo vitae mauris aliquam tempus"
title = 'SomeSong'







i = 0
while(i<10):
    cur.execute("INSERT INTO songs (title, author,lyrics) VALUES (?,?,?)",
            (title+str(i),author+str(i),lyrics)
        )
   
    i+=1

connection.commit()
connection.close()