Deploy: [wfz1-english-for-kids.herokuapp.com](https://wfz1-english-for-kids.herokuapp.com/)  
Design: https://www.figma.com/file/hGVWTbIJx9FQi3UZN3bPms/English-for-kids?node-id=0%3A1  
Description:  
https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rslang/english-for-kids.md  
https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rslang/english-for-kids-admin-panel.md  
  
  
Authorization:  
Username: admin  
Password: admin  
  
  
The data is stored in the memory of the application. Therefore, a situation may arise after deleting or changing a category, it will restore to its previous form, the probability is not great, but still I will write about it. Heroku has a temporary file system that stores application data and is cleared at least once a day (all data written by the application to the local file system is lost).  
[Description in the Heroku official documentation](https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#5-use-a-database-or-object-storage-instead-of-writing-to-your-local-filesystem).
