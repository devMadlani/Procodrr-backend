## Steps

1. Add this lines in mongod.cfg file

-      replication: replSetName: myReplicaSet

2. Then edit the connection string as below:

-       mongodb://localhost:27017/?              replicaSet=myReplicaSet

3. And run the mongosh commond in terminal to start the monogo shell
4. Inside mongo shell write this command to initiate replicaSet :

-        rs.initiate()
