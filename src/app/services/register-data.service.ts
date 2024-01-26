import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterDataService {
    documentList = new Subject<any>();
    documentForm = new Subject<any>();

    setDocumentList(documentLists) {
        this.documentList.next(documentLists);
    }

    getDocumentList() {
        return this.documentList.asObservable();
    }

    setDocumentForm(documentForm) {
        this.documentForm.next(documentForm);
    }

    getDocumentForm() {
        return this.documentForm.asObservable();
    }

    ngOnDestroy() {
        this.documentList.unsubscribe();
        this.documentForm.unsubscribe();
    }
}