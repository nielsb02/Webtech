--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Names of all authors:
- Niels Blonk 
- Vincent Pattinama 
- Gabriël Shamon 
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
A direct link (full URL) to the location of the website at http://webtech.science.uu.nl/:
-  http://webtech.science.uu.nl/group31
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
A brief explanation of your web-site, the structure of your application, including every content file and every code file, the structure of your database:

The website consists of 6 webpages: a home page, 4 information pages and 1 quiz page. Users can read the information pages and test themselves on the knowledge they have gained while reading the information pages with the help of the quiz.
Our codebase consists of 6 different directories and 3 files which arent placed in a directory. The directories are:
•	Database
•	Error
•	Log
•	Node_modules
•	Routes
•	Static

Database
This directory consists of the database (made in sqlite3) and quizDB_handler.js, which holds the functions for accessing the database and is a middleware component.

Error
This directory consists of the error handlers, which are middleware components.

Log
This directory holds the logger and the text file in which the logger writes the http requests. The logger is a middleware component.

Node_modules
This directory consists of the packages that were downloaded during the creation of homework assignment 3.

Routes
This directory holds the api_router.js, which controls the routing. It is also a middleware component.

Static
This directory consists 3 subdirectories and the html files. The 3 subdirectories are:
•	Css
•	Javascript
•	Resources

Css
The css subdirectory holds the stylesheets used to style the HTML pages.

Javascript
The javascript subdirectory holds the javascript of the webpage. Each javascript file has the following purpose:
•	Account.js: ensures that the user is able to create an account and is able to login.
•	Ajax.js: holds the functions to send ajax requests
•	Layout.js: provides the general layout of the website.
•	Menus.js: provides the menus that allow the user to dynamically change the appearance of elements on the web page (homework assignment 2).
•	quizContent.js: provides the code needed to create the quiz.
•	topics.js: provides the code needed to create the topic headers.

Resources
This directory holds the images that are used on the website.

HTML files
This directory holds the web pages of the website.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Logins and passwords of all registered students:

- email: janblok@uu.nl
  password: Blokjan1

- email: Piet@uu.nl
  password: Paulusma8

- email: kees@uu.nl
  password: Kees1243

- email: mo@uu.nl
  password: Alivdb123

- email: chatmo@uu.nl
  password: Appmo420
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
The SQL definition of your database (the CREATE TABLE statements):

PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE User (
	UserID INTEGER PRIMARY KEY AUTOINCREMENT,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
	Is_superUser BOOLEAN DEFAULT FALSE
);
INSERT INTO User VALUES(1,'Jan','Blok','janblok@uu.nl', "Blokjan1", 1);
INSERT INTO User VALUES(2,'Piet','Paulusma','Piet@uu.nl', "Paulusma8",0);
INSERT INTO User VALUES(3,'Kees','Spek','kees@uu.nl', "Kees1243", 0);
INSERT INTO User VALUES(4,'Mo','Ali','mo@uu.nl', "Alivdb123", 0);
INSERT INTO User VALUES(5,'Chatmo','You','chatmo@uu.nl', "Appmo420", 0);
CREATE TABLE Topic (
	TopicID INTEGER PRIMARY KEY,
	Title TEXT NOT NULL
);
INSERT INTO Topic VALUES(1,'Importance and Standards');
INSERT INTO Topic VALUES(2,'Perspectives of Web Accessibility');
INSERT INTO Topic VALUES(3,'Basic Web Accessibility tips and tricks');
CREATE TABLE Quiz (
	QuizID INTEGER PRIMARY KEY,
	topicID INTEGER NOT NULL,
     	linkDescription TEXT NOT NULL,
	title TEXT NOT NULL,
    	FOREIGN KEY(topicID)REFERENCES Topic(topicID)
);
INSERT INTO Quiz VALUES(1,1,'why.html#importance','The importance of web accessibility');
INSERT INTO Quiz VALUES(2,1,'standards.html#standards','Web accessibility standards');
INSERT INTO Quiz VALUES(3,2,'perspectives.html#perspective','User disabilities affected by bad web accessibility');
INSERT INTO Quiz VALUES(4,2,'perspectives.html#table','Solutions for users with a disability');
INSERT INTO Quiz VALUES(5,3,'guidelines.html#layout','How to create a proper semantic layout for your web page');
INSERT INTO Quiz VALUES(6,3,'guidelines.html#attributes','How to create and set the proper attribute for your web page');
CREATE TABLE Question (
QuizID INTEGER NOT NULL,
QuestionID INTEGER PRIMARY KEY,
    Type TEXT NOT NULL,
     Question TEXT NOT NULL,
     Quote TEXT,
     Source TEXT,
     Placeholder TEXT,
     FOREIGN KEY(QuizID)REFERENCES Quiz(QuizID)
);
INSERT INTO Question VALUES(1,1,'mcq','Which main reason is false in the following choices?',NULL,NULL,NULL);
INSERT INTO Question VALUES(1,2,'mcq','To which main reason does this belong to?','The Web is built on ideas of free access to anything for anyone. For this reason, no one should be excluded from the Web.',NULL,NULL);
INSERT INTO Question VALUES(1,3,'mcq','To which main reason does this belong to?','It will improve the brand images of organisations. Having more people on the Web will ultimately lead to a better brand image.',NULL,NULL);
INSERT INTO Question VALUES(1,4,'mcq','To which main reason does WCAG 2.1 belong to?',NULL,NULL,NULL);
INSERT INTO Question VALUES(1,5,'mcq','To which main reason does this belong to','websites will be made device independant, meaning every device is able to use the website.',NULL,NULL);
INSERT INTO Question VALUES(2,6,'mcq','What is WCAG',NULL,NULL,NULL);
INSERT INTO Question VALUES(2,7,'mcq','To which grade does this belong to?','This level makes content accessible to people with a wider range of disabilities by providing guidance on elements such as color contrast and error identification. Regulators prefer this level.',NULL,NULL);
INSERT INTO Question VALUES(2,8,'mcq','To which principle does this belong to','Information and user interface components must be presentable to users in ways they can perceive. This means that users must be able to perceive the information being presented (it can''t be invisible to all of their senses).',NULL,NULL);
INSERT INTO Question VALUES(3,9,'mcq','Which disability does not belong between the other answers?',NULL,NULL,NULL);
INSERT INTO Question VALUES(3,10,'mcq','What question should website developers not need to question themselves?',NULL,NULL,NULL);
INSERT INTO Question VALUES(3,11,'mcq','What is sometimes called motor disability?',NULL,NULL,NULL);
INSERT INTO Question VALUES(4,12,'mcq','Where does the feature ’Voice Recognition’ belong to?',NULL,NULL,NULL);
INSERT INTO Question VALUES(4,13,'mcq','Where does the feature ’Colors with Good Contrast’ belong to?',NULL,NULL,NULL);
INSERT INTO Question VALUES(4,14,'mcq','Where does the feature ’Video captions’ belong to?',NULL,NULL,NULL);
INSERT INTO Question VALUES(4,15,'mcq','Where does the feature ‘Understandable Content’ belong to?',NULL,NULL,NULL);
INSERT INTO Question VALUES(5,16,'fillin','What element should replace the dots?',NULL,'list.png','Example: header');
INSERT INTO Question VALUES(5,17,'fillin','What element should replace the dots?',NULL,'afbeelding.png','Example: header');
INSERT INTO Question VALUES(5,18,'mcq','What element should replace the dots?',NULL,'paragraph.png',NULL);
INSERT INTO Question VALUES(6,19,'mcq','What element should replace the question sign?',NULL,'alt3.png',NULL);
INSERT INTO Question VALUES(6,20,'fillin','What element should replace the dots?',NULL,'title.png','Example: header');
INSERT INTO Question VALUES(6,21,'mcq','An image should always have:',NULL,NULL,NULL);
CREATE TABLE Option (
     OptionID INTEGER PRIMARY KEY,
     QuestionID INTEGER NOT NULL,
     option TEXT NOT NULL,
     Is_correct BOOLEAN DEFAULT FALSE,
     FOREIGN KEY(QuestionID)REFERENCES Question(QuestionID)
);
INSERT INTO Option VALUES(1,1,'Epical reasons',1);
INSERT INTO Option VALUES(2,1,'Reputational reasons',0);
INSERT INTO Option VALUES(3,1,'Legal reasons',0);
INSERT INTO Option VALUES(4,1,'Commercial reasons',0);
INSERT INTO Option VALUES(5,2,'Ethical reasons',1);
INSERT INTO Option VALUES(6,2,'Reputational reasons',0);
INSERT INTO Option VALUES(7,2,'Legal reasons',0);
INSERT INTO Option VALUES(8,2,'Commercial reasons',0);
INSERT INTO Option VALUES(9,3,'Ethical reasons',0);
INSERT INTO Option VALUES(10,3,'Reputational reasons',0);
INSERT INTO Option VALUES(11,3,'Legal reasons',1);
INSERT INTO Option VALUES(12,3,'Commercial reasons',0);
INSERT INTO Option VALUES(13,4,'Ethical reasons',0);
INSERT INTO Option VALUES(14,4,'Reputational reasons',0);
INSERT INTO Option VALUES(15,4,'Legal reasons',1);
INSERT INTO Option VALUES(16,4,'Commercial reasons',0);
INSERT INTO Option VALUES(17,5,'Ethical reasons',0);
INSERT INTO Option VALUES(18,5,'Reputational reasons',0);
INSERT INTO Option VALUES(19,5,'Legal reasons',0);
INSERT INTO Option VALUES(20,5,'Commercial reasons',1);
INSERT INTO Option VALUES(21,6,'Web Content Accessibility Guidelines',1);
INSERT INTO Option VALUES(22,6,'Web Content Availability Guidelines',0);
INSERT INTO Option VALUES(23,6,'Who Can Access Guidelines',0);
INSERT INTO Option VALUES(24,6,'World Content Accessibility Guidelines',0);
INSERT INTO Option VALUES(25,7,'A',0);
INSERT INTO Option VALUES(26,7,'AA',1);
INSERT INTO Option VALUES(27,7,'AAA',0);
INSERT INTO Option VALUES(28,8,'Perceivable',1);
INSERT INTO Option VALUES(29,8,'Operable',0);
INSERT INTO Option VALUES(30,8,'Understandable',0);
INSERT INTO Option VALUES(31,8,'Robust',0);
INSERT INTO Option VALUES(32,9,'Smell Disability',1);
INSERT INTO Option VALUES(33,9,'Hearing Disability',0);
INSERT INTO Option VALUES(34,9,'Cognitive Disability',0);
INSERT INTO Option VALUES(35,9,'Physical Disability',0);
INSERT INTO Option VALUES(36,10,'How do people who cannot move their arms use your website?',0);
INSERT INTO Option VALUES(37,10,'How do people who cannot see well or at all use your website?',0);
INSERT INTO Option VALUES(38,10,'How do people who have difficulty hearing or understanding use your website?',0);
INSERT INTO Option VALUES(39,10,'How do people who are addicted to drugs use your website?',1);
INSERT INTO Option VALUES(40,12,'Visual Disability',0);
INSERT INTO Option VALUES(41,12,'Hearing Disability',0);
INSERT INTO Option VALUES(42,12,'Cognitive Disability',0);
INSERT INTO Option VALUES(43,12,'Physical Disability',1);
INSERT INTO Option VALUES(44,13,'Visual Disability',1);
INSERT INTO Option VALUES(45,13,'Hearing Disability',0);
INSERT INTO Option VALUES(46,13,'Cognitive Disability',0);
INSERT INTO Option VALUES(47,13,'Physical Disability',0);
INSERT INTO Option VALUES(48,14,'Visual Disability',0);
INSERT INTO Option VALUES(49,14,'Hearing Disability',1);
INSERT INTO Option VALUES(50,14,'Cognitive Disability',0);
INSERT INTO Option VALUES(51,14,'Physical Disability',0);
INSERT INTO Option VALUES(52,15,'Visual Disability',0);
INSERT INTO Option VALUES(53,15,'Hearing Disability',0);
INSERT INTO Option VALUES(54,15,'Cognitive Disability',1);
INSERT INTO Option VALUES(55,15,'Physical Disability',0);
INSERT INTO Option VALUES(56,18,'H1',0);
INSERT INTO Option VALUES(57,18,'P',1);
INSERT INTO Option VALUES(58,18,'Div',0);
INSERT INTO Option VALUES(59,18,'Alt',0);
INSERT INTO Option VALUES(60,19,'Title',1);
INSERT INTO Option VALUES(61,19,'Input',0);
INSERT INTO Option VALUES(62,19,'Label',0);
INSERT INTO Option VALUES(63,19,'Alt',0);
INSERT INTO Option VALUES(64,21,'Title',0);
INSERT INTO Option VALUES(65,21,'Input',0);
INSERT INTO Option VALUES(66,21,'Label',0);
INSERT INTO Option VALUES(67,21,'Alt',1);
INSERT INTO Option VALUES(68,16,'li',1);
INSERT INTO Option VALUES(69,17,'aside',1);
INSERT INTO Option VALUES(70,20,'type',1);
INSERT INTO Option VALUES(71,11,'Visual Disability',0);
INSERT INTO Option VALUES(72,11,'Hearing Disability',0);
INSERT INTO Option VALUES(73,11,'Cognitive Disability',0);
INSERT INTO Option VALUES(74,11,'Physical Disability',1);
CREATE TABLE UserAnswer (
AnswerID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
QuestionID INTEGER NOT NULL,
OptionID INTEGER,
Option TEXT NOT NULL,
UserID INTEGER NOT NULL,
     FOREIGN KEY(QuestionID)REFERENCES Question(QuestionID),
     FOREIGN KEY(OptionID)REFERENCES Option(OptionID),
     FOREIGN KEY(UserID)REFERENCES User(UserID)
);
INSERT INTO UserAnswer VALUES(2,16,NULL,'li',3);
INSERT INTO UserAnswer VALUES(3,17,NULL,'asss',3);
INSERT INTO UserAnswer VALUES(4,20,NULL,'type',3);
INSERT INTO UserAnswer VALUES(5,16,NULL,'li',1);
INSERT INTO UserAnswer VALUES(6,17,NULL,'aside',1);
INSERT INTO UserAnswer VALUES(7,18,59,'Alt',1);
INSERT INTO UserAnswer VALUES(9,21,67,'Alt',1);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('User',5);
INSERT INTO sqlite_sequence VALUES('UserAnswer',122);
COMMIT;
