CREATE TABLE IF NOT EXISTS travelpost (
    id SERIAL PRIMARY KEY,      
    traveller_name VARCHAR(255),       
    title VARCHAR(255),         
    location VARCHAR(255),       
    image_url TEXT                  
);

CREATE TABLE IF NOT EXISTS comments(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),       
    comment TEXT,
    post_id INTEGER REFERENCES travelpost(id) ON DELETE CASCADE
)






INSERT INTO travelpost (traveller_name, title, location, image_url)
VALUES ('Mary','Honey Moon', 'Maldives','https://cdn.pixabay.com/photo/2014/02/07/04/07/maldives-260686_640.jpg'),
('Mike','Canal Tour', 'Amsterdam, Netherlands','https://cdn.pixabay.com/photo/2021/11/10/07/32/amsterdam-6783217_640.jpg'),
('Sally','Northern Lights', 'Iceland','https://cdn.pixabay.com/photo/2017/03/02/16/54/iceland-2111811_640.jpg'),
('Vicky','City Break', 'Tokyo','https://cdn.pixabay.com/photo/2018/02/05/11/29/tokyo-3131978_640.jpg'),
('John','Grand Canyon', 'Arizona, USA','https://cdn.pixabay.com/photo/2016/03/03/23/13/grand-canyon-1235221_640.jpg');


INSERT INTO comments (name, comment,post_id)
VALUES ('Sam','I love this place, went with my family and they loved it.',1),
('Olivia', 'I’ve been to Amsterdam too! Amazing place.', 2)