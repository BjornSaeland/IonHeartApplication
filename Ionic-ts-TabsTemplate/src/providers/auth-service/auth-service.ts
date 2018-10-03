import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthServiceProvider {

  backendIP: string;
  backendPort: string;
  protocol: string;
  data: any;
  headers: any;

  constructor(private http: HttpClient, private storage: Storage) {
    //CONFIG FOR BACKEND
    //Set ip and port used by backend
    this.backendIP = '127.0.0.1';
    this.backendPort = ':' + '8080';
    this.protocol = 'http' + '://';
  }


  public logout(): void {
    //Remove token and user id from storage.
    this.storage.remove("JWT").then((val) => {
      this.storage.remove("uuid").then((val) => {
        console.log("Logout ok.");
      });
    });
  }

  public login(username, password): Promise<any> {
    //Create http headers
    let temp_headers = new HttpHeaders().set('content-type', 'application/json');
    return new Promise((resolve, reject) => {
      //Set body to username and password
      let body = JSON.stringify({ 'username': username, 'password': password });
      //Send http-request to backend
      this.http.post(this.protocol + this.backendIP + this.backendPort + '/api/user/patient/login',
        body,
        { headers: temp_headers })
        .subscribe(res => {
          //If http-request ok, then send back output data returned from backend to caller of function login()
          this.data = res;
          resolve(this.data);
        },
          (err) => {
            //If http-request not ok, send back http-error code.
            reject(err.status);
          });
    });
  }

  public register(typeOfData, value, token): Promise<any> {
    //Create http headers, add authorization token gained from user login.
    let temp_headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return new Promise((resolve, reject) => {
      let body_data = {}
      //Set body to typeofvalue: value
      body_data[typeOfData] = value;
      let body = JSON.stringify(body_data);
      //Get user id
      this.storage.get('uuid')
        .then((uuid) => {
          //Send http request
          this.http.post(this.protocol + this.backendIP + this.backendPort + '/api/data/post?id=' + uuid,
            body,
            { headers: temp_headers })
            .subscribe(res => {
              //When successfull request got through, output is this data.
              this.data = res;
              resolve(this.data);
            },
              (err) => {
                //When non successfull request response, output error data.
                reject(err);
              });
        })
    });
  }

  public changePassword(oldPassword, newPassword, token): Promise<any> {
    //Create http headers, add authorization token gained from user login.
    let temp_headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return new Promise((resolve, reject) => {
      //Create body of old and new password
      let body = JSON.stringify({ 'old': oldPassword, 'new': newPassword });
      //Get user id
      this.storage.get('uuid')
        .then((uuid) => {
          //Send http request
          this.http.post(this.protocol + this.backendIP + this.backendPort + '/api/user/password/post?id=' + uuid,
            body,
            { headers: temp_headers })
            .subscribe(res => {
              //Recieve output from backend, correct output
              this.data = res;
              resolve(this.data);
            },
              (err) => {
                //Recieve output from backend, error output
                reject(err);
              });
        })
    });
  }

  //Function to get all measurement types
  public getTypes(token): Promise<any> {
    //Create http headers, add authorization token gained from user login.
    let temp_headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return new Promise((resolve, reject) => {
      //Send http request
      this.http.get(this.protocol + this.backendIP + this.backendPort + '/api/data/types/get', { headers: temp_headers })
        .subscribe(res => {
          //Recieve output from backend, correct output
          this.data = res;
          resolve(this.data);
        },
          (err) => {
            //Recieve output from backend, error output
            reject(err);
          });
    });
  }

  public getSchedule(token): Promise<any> {
    //Create http headers, add authorization token gained from user login.
    let temp_headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return new Promise((resolve, reject) => {
      //Get user id
      this.storage.get('uuid')
        .then((uuid) => {
          this.http.get(this.protocol + this.backendIP + this.backendPort + '/api/schedule/get?id=' + uuid, { headers: temp_headers })
            .subscribe(res => {
              //Recieve output from backend, correct output
              this.data = res;
              resolve(this.data);
            },
              (err) => {
                //Recieve output from backend, error output
                reject(err);
              });
        });
    });
  }

  public getData(typeOfData, token, startTime, endTime): Promise<any> {
    //Create http headers, add authorization token gained from user login.
    let temp_headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return new Promise((resolve, reject) => {
      //Get user id
      this.storage.get('uuid')
        .then((uuid) => {
          this.http.get(this.protocol + this.backendIP + this.backendPort + '/api/data/get/' + typeOfData + '?id=' + uuid + '&start=' + startTime + '&end=' + endTime,
            { headers: temp_headers })
            .subscribe(res => {
              //Recieve output from backend, correct output
              this.data = res;
              resolve(this.data);
            },
              (err) => {
                //Recieve output from backend, error output
                reject(err);
              });
        })
    });
  }
}