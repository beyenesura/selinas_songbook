import React from 'react';

export const SongList = (props) => {
    return <>
        {
        props.songlist.map((song) => {
            return <>
            <div>
                <p>{song[0]}</p>
                <p>{song[1]}</p>
                <p>{song[2]}</p>
                <p>{song[3]}</p>
                <p>{song[4]}</p>
            </div>
            </>
        })
       
        }
     <button onClick={(e)=>props.setPG('viewdata')}>Homepage</button>
   
    </>
} 
	