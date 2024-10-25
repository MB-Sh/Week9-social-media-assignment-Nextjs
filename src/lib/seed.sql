CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,    
  clerk_id TEXT UNIQUE NOT NULL,                    
  username TEXT NOT NULL,                           
  profile_image_url TEXT,                           
  bio TEXT                                          
);

CREATE TABLE IF NOT EXISTS post (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,   
  title TEXT NOT NULL,                             
  content TEXT NOT NULL,                            
  created_at TIMESTAMP DEFAULT NOW(),               
  up_clerk_id TEXT NOT NULL,   
  CONSTRAINT fk_user_clerk_id FOREIGN KEY (up_clerk_id) REFERENCES users(clerk_id) ON DELETE CASCADE 
);




INSERT INTO users (clerk_id, username, profile_image_url, bio)
VALUES 
  ('clerk_12', 'Tim', 'https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_640.jpg', 'I am a web developer who loves writing about tech.'),
  ('clerk_34', 'Jack', 'https://cdn.pixabay.com/photo/2012/03/02/12/46/man-21279_640.jpg', 'Passionate about coding and sharing knowledge.'),
  ('clerk_56', 'Glenn', 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_640.jpg', 'Full-stack engineer and tech enthusiast.'),
  ('clerk_78', 'Kat', 'https://cdn.pixabay.com/photo/2017/11/10/18/24/woman-2937182_640.jpg', 'I design and build modern web interfaces.'),
  ('clerk_90', 'Jen', 'https://cdn.pixabay.com/photo/2018/03/20/06/47/people-3242369_640.jpg', 'Love solving coding problems and writing about them.');


INSERT INTO post (title, content, up_clerk_id)
VALUES 
  ('The Future of Web Development', 'A quick dive into the trends shaping the future of the web.', 'clerk_12'),
  ('5 Productivity Tips for Developers', 'Learn how to manage your time and be more productive as a developer.', 'clerk_34'),
  ('Why JavaScript is Still King', 'An overview of why JavaScript remains the dominant language in web development.', 'clerk_56'),
  ('A Beginners Guide to Next.js', 'Getting started with the Next.js framework and its core features.', 'clerk_78'),
  ('Mastering CSS Grid in 10 Minutes', 'A concise guide to mastering CSS Grid for responsive layouts.', 'clerk_90');
