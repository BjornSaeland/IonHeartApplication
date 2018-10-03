
//import { azure } from 'azureClient';
//import { AzureBackendProvider } from '../../providers/servicesTS/azureClient';
//import { UserData } from '../../app/shared/models/UserData.model';
//import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';

//declare var WindowsAzure: any;

//@Injectable()
//export class azureAPI
//{
//  //WindowsAzure: any;
//  todoItemTable: any[];
//  AzureClient: any;
//  client: any;

//  constructor(public Azure: AzureBackendProvider, private http: HttpClient)
//  {
//    this.client = new WindowsAzure.MobileServiceClient('https://ionheartbackend.azurewebsites.net');

//    this.AzureClient = this.client.getTable('todoitem');
//  }

//  getUsers() {
//    return this.http.get<UserData[]>(this.AzureClient);
//  }

//  getUserById(id: number) {
//    return this.http.get<UserData>(this.AzureClient + '/' + id);
//  }

//  createUser(user: UserData) {
//    return this.http.post(this.AzureClient, user);
//  }
  
//  updateUser(user: UserData) {
//    return this.http.put(this.AzureClient + '/' + user.Id, user);
//  }

//  deleteUser(id: number) {
//    return this.http.delete(this.AzureClient + '/' + id);
//  }








//}































//angular.module('app.services', ['azure'])
//  .factory('azureAPI', ['client' ,'$q', '$rootScope', function (client, $q, $rootScope) {

//    return {
//      getAll: function () {
//        var deferred = $q.defer();

//        var userId = client.currentUser.userId;

//        //filter by user id
//        client.getTable('Task').where({userId:userId}).read().then(function () {
//          deferred.resolve.apply(this, arguments);
//          $rootScope.$apply();
//        }, function () {
//          deferred.reject.apply(this, arguments);
//          $rootScope.$apply();
//        });

//        return deferred.promise;
//      },

//      addTask: function (task) {

//        task.userId = client.currentUser.userId;
//        var deferred = $q.defer();

//        client.getTable('Task').insert(task).then(function (data) {
//          deferred.resolve.apply(this, arguments);
//        }, function (error) {
//          deferred.reject.apply(this, arguments);
//        });
//        return deferred.promise;
//      },

//      updateTask: function (task) {
//        var deferred = $q.defer();
//        task.userId = client.currentUser.userId;

//        client.getTable('Task').update(task).then(function (data) {
//          deferred.resolve.apply(this, arguments);
//        }, function (error) {
//          deferred.reject.apply(this, arguments);
//        });
//        return deferred.promise;
//      }

//    };
//  }]);
