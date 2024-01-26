import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';

@Injectable({
    providedIn: 'root'
})
export class DishService {

    host: string = this.awsHelper.getHost('/dish-module');

    private url: string;

    constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService) { }

    getAllDishes(sequence_chef_id, page, pageSize) {
        var path = allURLS['READ_ALL_DISH'] + '?filter[sequence_chef_id]=' + sequence_chef_id + '&page[number]=' + page
            + '&page[size]=' + pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getDishData(dishId) {
        if (dishId != 0) {
            var path = allURLS['READ_ALL_DISH'] + '/' + dishId;
            return this.APIWrapperService.callGetAPI(this.host, path);
        }
    }
    createDish(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_DISH'], formData);
    }
    filterDish(filterValue: any,chefId, pageSize) {
        var path = allURLS['READ_ALL_DISH'] + '?filter[name]=' +encodeURIComponent(filterValue) +'&filter[sequence_chef_id]='+encodeURIComponent(chefId)+ '&page[size]=' + encodeURIComponent(pageSize);
        
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getFloatingAllDishes(sequence_chef_id, page, pageSize) {
        var path = allURLS['READ_ALL_DISH'] + '?filter[available]=true&filter[sequence_chef_id]=' + sequence_chef_id + '&page[number]=' + page
            + '&page[size]=' + pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    filterFloatingDish(filterValue: any,chefId, pageSize) {
        var path = allURLS['READ_ALL_DISH'] + '?filter[available]=true&filter[name]=' +encodeURIComponent(filterValue) +'&filter[sequence_chef_id]='+encodeURIComponent(chefId)+ '&page[size]=' + encodeURIComponent(pageSize);
        
        return this.APIWrapperService.callGetAPI(this.host, path);
    }

    deleteDish(dishId: any) {
        var path = allURLS['READ_ALL_DISH'] + '/' + dishId;
        var formData = new FormData();
        formData.append('_method', 'DELETE');
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    dishImageUpload(dishImages: FormData, dishId) {
        var path = allURLS['UPLOAD_DISH_IMAGES'] + dishId + '/images';
        return this.APIWrapperService.callPostAPI(this.host, path, dishImages)
    }

    dishImageDelete(formData: any, dishId) {
        var path = allURLS['UPLOAD_DISH_IMAGES'] + dishId + '/images';
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    approveChefService(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['CHEF_SERVICE'], formData);
    }
    getAllReservation(sequence_chef_id, page, pageSize) {
        var path = allURLS['CHEF_RESERVATION'] + '?filter[sequence_chef_id]=' + sequence_chef_id + '&page[number]=' + page + '&page[size]=' + pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getReservationData(reservationId) {
        if (reservationId != 0) {
            var path = allURLS['CHEF_RESERVATION'] + '/' + reservationId;
            return this.APIWrapperService.callGetAPI(this.host, path);
        }
    }
    createReservation(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['CHEF_RESERVATION'], formData);
    }
    filterReservation(filterValue: any,chefId, pageSize) {
        // sequence_chef_id
        var path = allURLS['CHEF_RESERVATION'] + '?filter[name]=' + encodeURIComponent(filterValue) +'&filter[sequence_chef_id]='+chefId+ '&page[size]=' + pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    deleteReservation(reservationId: any) {
        var path = allURLS['CHEF_RESERVATION'] + '/' + reservationId;
        var formData = new FormData();
        formData.append('_method', 'DELETE');
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    reservationImageUpload(dishImages: FormData, reservationId) {
        var path = allURLS['UPLOAD_RESERVATION_IMAGES'] + reservationId + '/images';
        return this.APIWrapperService.callPostAPI(this.host, path, dishImages)
    }

    reservationImageDelete(formData: any, reservationId) {
        var path = allURLS['UPLOAD_RESERVATION_IMAGES'] + reservationId + '/images';
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    updateReservation(reservationdishId: any, formData: any) {
        var path = allURLS['CHEF_RESERVATION'] + '/' + reservationdishId;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }

    getAllComboDishes(sequence_chef_id, page, pageSize) {
        var path = allURLS['READ_COMBO_DISHES'] + '?filter[sequence_chef_id]=' + sequence_chef_id + '&page[number]=' + page + '&page[size]=' + pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    updateComboDish(comboDishId: any, formData: any) {
        var path = allURLS['READ_COMBO_DISHES'] + '/' + comboDishId;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    createComboDish(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_COMBO_DISHES'], formData);
    }
    getComboData(comboId) {
        if (comboId != 0) {
            var path = allURLS['READ_COMBO_DISHES'] + '/' + comboId;
            return this.APIWrapperService.callGetAPI(this.host, path);
        }
    }
    deleteComboDish(dishId) {
        var path = allURLS['READ_COMBO_DISHES'] + '/' + dishId;
        var formData = new FormData();
        formData.append('_method', 'DELETE');
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    filterComboDish(filterValue,chefId, pageSize) {
        var path = allURLS['READ_COMBO_DISHES'] + '?filter[name]=' + encodeURIComponent(filterValue) +'&filter[sequence_chef_id]='+chefId+'&page[size]=' + pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    comboDishImageUpload(combodishImages: FormData, combodishId) {
        var path = allURLS['READ_COMBO_DISHES'] + '/' + combodishId + '/images';
        return this.APIWrapperService.callPostAPI(this.host, path, combodishImages)
    }

    getAllPromo(sequence_chef_id, page, pageSize) {
        var path = allURLS['READ_PROMOTION'] + '?filter[sequence_chef_id]=' + sequence_chef_id + '&page[number]=' + page + '&page[size]=' + pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    updatePromo(PromoId: any, formData: any) {
        var path = allURLS['READ_PROMOTION'] + '/' + PromoId;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    createPromo(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_PROMOTION'], formData);
    }
    getPromoData(PromoId) {
        if (PromoId != 0) {
            var path = allURLS['READ_PROMOTION'] + '/' + PromoId;
            return this.APIWrapperService.callGetAPI(this.host, path);
        }
    }
    deletePromo(dishId) {
        var path = allURLS['READ_PROMOTION'] + '/' + dishId;
        var formData = new FormData();
        formData.append('_method', 'DELETE');
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    filterPromo(filterValue, pageSize) {
        var path = allURLS['READ_PROMOTION'] + '?filter[name]=' + encodeURIComponent(filterValue) + '&page[size]=' + pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }

    floatingMenuUpdate(dishId: any, formData: any) {
        var path = allURLS['READ_ALL_DISH'] + '/' + dishId + '/floating-menu';
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }

    updateDish(dishId: any, formData: any) {
        var path = allURLS['READ_ALL_DISH'] + '/' + dishId;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }

    makeDishesAvailable(dishId,formData) {
        var path=allURLS['MAKE_DISHES_AVAILABEL']+dishId+"/available";
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }

    getAllCategory() {
        return this.APIWrapperService.callGetAPI(this.host, allURLS['ALL_CATEGORY']);
    }

    getAllDietType() {
        return this.APIWrapperService.callGetAPI(this.host, allURLS['READ_ALL_DIETTYPE']);
    }

    getAllCuisine() {
        return this.APIWrapperService.callGetAPI(this.host, allURLS['READ_ALL_CUISINE']);
    }

    getAllChefList() {
        return this.APIWrapperService.callGetAPI(this.host, allURLS['CHEF_LIST']);
    }

    serviceRequest(sequence_service_id) {
        var formData = new FormData();
        formData.append('sequence_service_id', sequence_service_id);
        var path = allURLS['CHEF_AVAILABEL'] + 'service';
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
}
