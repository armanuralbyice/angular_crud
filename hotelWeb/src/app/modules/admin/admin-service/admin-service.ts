import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserStorageService} from '../../../auth/services/storage/user-storage.service';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  postRoomDetails(roomDto: any): Observable<any> {
    return this.http.post(`${BASE_URL}api/admin/room`, roomDto, {
      headers: this.createAuthorizationHeaders()
    });
  }
  getRooms(pageNumber: number): Observable<any> {
    return this.http.get(`${BASE_URL}api/admin/rooms/${pageNumber}`, {
      headers: this.createAuthorizationHeaders()
    });
  }
  getRoomById(id: number): Observable<any> {
    return this.http.get(`${BASE_URL}api/admin/room/${id}`, {
      headers: this.createAuthorizationHeaders()
    });
  }
  updateRoomDetails(id: number, roomDto: any): Observable<any>{
    return this.http.post(`${BASE_URL}api/admin/room/${id}`, roomDto, {
      headers: this.createAuthorizationHeaders()
    })
  }
  deleteRoomDetails(id: number): Observable<any>{
    return this.http.delete(`${BASE_URL}api/admin/room/${id}`, {
      headers: this.createAuthorizationHeaders()
    })
  }

  // tslint:disable-next-line:typedef
  createAuthorizationHeaders() {
    const authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }
}
