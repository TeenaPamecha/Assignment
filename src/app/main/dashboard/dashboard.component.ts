import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from '../../services/dashboard.service';;
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /* canvas graph of on demand and reservation */
  public canvas: any;
  public ctx;
  public canvas1: any;
  public ctx1;
  public datasets: any;
  public data: any;
  public onDemandChartData;
  public reservationChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  public clickedR:boolean =true;
  public clickedR1: boolean =false;
  public clickedR2: boolean = false;
  config: any = {};
  config1: any = {};
  isLoadingResults1: boolean = true;
  isLoadingResults2: boolean = true;
  public gradientChartOptionsConfigurationWithTooltipRed: any = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },

    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            callback: function(value, index, values) {
              return '$' + value;
          },
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(233,32,16,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
  };
  public gradientBarChartConfiguration = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'bottom'
    },
    
    tooltips: {
      
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(186,84,245,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            callback: function(value, index, values) {
              return '$' + value;
          },
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(186,84,245,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  };
  /* end  canvas graph of on demand and reservation */

  public chefDetails: any = [];
  public driverDetails: any = [];
  public onDemandSaleDetaills: any = [];
  public reservationSaleDetaills: any = [];

  onDemandLabel: any = [];
  onDemand_Chef_Data: any = [];
  onDemand_Driver_Data: any = [];
  showOnDemandChart = false;

  reservationLabel: any = [];
  reservation_Data: any = [];
  showReservationChart = false;
  constructor(private userDataService: UserDataService, public formBuilder: FormBuilder, private toastr: ToastrService,
    private dashboardService: DashboardService, private router: Router, private datePipe: DatePipe,
    private authenticateService: AuthenticationService) { 

     
    }

  ngOnInit() {
    this.canvas = document.getElementById("onDemandChart");
    this.ctx = this.canvas.getContext("2d");

    this.canvas1 = document.getElementById("reservationChart");
    this.ctx1 = this.canvas1.getContext("2d");
    this.getAllChefDetails();
    this.getAllDriverDetails();
    this.getOnDemandSaleDetails();
    this.getReservationSaleDetails();

  }
  getAllChefDetails() {
    let responseObs1 = this.dashboardService.getAllChefDetails();
    responseObs1.subscribe(
      data => {
        let response: any = data;
        if (response) {
          this.chefDetails = response.data;
          console.log('Android:..', this.chefDetails.Android, '---IOS:..', this.chefDetails.IOS);
        }
      },
      err => {
        var userData = this.userDataService.getUserData();
        var index = userData.roles[0].name == "Sub admin" ? 1 : -1;
        if (err.error.code == 401 && index == 1) {
          this.showMessageError("your permission has been changed need to logout.");
        }
        else if (err.error.code == 424 && index == 1) {
          this.showMessageError(err.error.message);
          this.authenticateService.logout_all();
        }
        else {
          this.showMessageError(err.error.message);
        }
      });
  }
  applyDateChange(event, type) {

    // if (this.range.invalid) {
    //   return true;
    // }

    if (event && type == "onDemand") {
      this.isLoadingResults1 = true;
      this.getOnDemandSaleDetails(parseInt(event),1);
    } else {
      this.isLoadingResults2 = true;
      this.getReservationSaleDetails(parseInt(event),1);
    }
  }
  getAllDriverDetails() {
    let responseObs1 = this.dashboardService.getAllDriverDetails();
    responseObs1.subscribe(
      data => {
        let response: any = data;
        if (response) {
          this.driverDetails = response.data;
        }
      },
      err => {
        var userData = this.userDataService.getUserData();
        var index = userData.roles[0].name == "Sub admin" ? 1 : -1;
        if (err.error.code == 401 && index == 1) {
          this.showMessageError("your permission has been changed need to logout.");
        }
        else if (err.error.code == 424 && index == 1) {

        }
        else {
          this.showMessageError(err.error.message);
        }
      });

  }
  getOnDemandSaleDetails(type = 1, flag = 0) {
    this.isLoadingResults1 = true;
    this.onDemandLabel = [];
    this.onDemand_Chef_Data = [];
    this.onDemand_Driver_Data = [];
    var startdate = this.datePipe.transform('2021-01-01', 'YYYY-MM-dd', 'UTC', 'en-US')
    var enddate = this.datePipe.transform(new Date(), 'YYYY-MM-dd', 'UTC', 'en-US')
    let responseObs1 = this.dashboardService.getOnDemandSaleDetails(type, startdate, enddate);
    responseObs1.subscribe(
      data => {
        let response: any = data;
        if (response) {
          this.isLoadingResults1 = false;
          this.showOnDemandChart = false;
          this.onDemandSaleDetaills = response.data;
       
          if (this.onDemandSaleDetaills.hasOwnProperty('overview')) {
            this.onDemandLabel = [];
            this.onDemand_Chef_Data = [];
            this.onDemand_Driver_Data = [];
            if (this.onDemandSaleDetaills['overview'].length > 0) {
              this.showOnDemandChart = true;
              this.onDemandSaleDetaills['overview'].filter((element, i) => {
                this.onDemandLabel.push(element.label);
                this.onDemand_Chef_Data.push(element.chef);
                this.onDemand_Driver_Data.push(element.driver);
              });
            }
            else {
              this.onDemandLabel = [];
              this.onDemand_Chef_Data = [];
              this.onDemand_Driver_Data = [];

              if (type == 1  && flag !=2) {
                this.onDemandLabel.push(this.datePipe.transform(new Date(), 'dd/MM/YYYY'));
                this.onDemand_Chef_Data.push(0);
                this.onDemand_Driver_Data.push(0);
                flag=2;
              }
              else if (type == 2  && flag !=2) {
                this.onDemandLabel.push(new Date().toLocaleString('default', { month: 'long' }));
                this.onDemand_Chef_Data.push(0);
                this.onDemand_Driver_Data.push(0);
                flag=2;
              } else if (type == 3 && flag !=2) {
                this.onDemandLabel.push(this.datePipe.transform(new Date(), 'YYYY'));
                this.onDemand_Chef_Data.push(0);
                this.onDemand_Driver_Data.push(0);
                flag=2;
              }
            }
          }
        
          if (this.onDemandChartData) {
            this.onDemandChartData.destroy();
          }
          var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

          gradientStroke.addColorStop(1, "rgba(225,78,202,0.8)");
          gradientStroke.addColorStop(0, "rgba(225,78,202,0)");

          var gradientStrokepurple = this.ctx.createLinearGradient(0, 230, 0, 50);

          gradientStrokepurple.addColorStop(1, "rgba(72,72,176,0.4)");
          gradientStrokepurple.addColorStop(0.8, "rgba(72,72,176,0.2)");
          gradientStrokepurple.addColorStop(0, "rgba(119,52,169,0)");
          this.config = {
            type: "bar",
            responsive: true,
            data: {
              labels:this.onDemandLabel,//["January","February","March","April"], //[2021,2022,2023,2024],
              //['JAN week1','JAN week2','JAN week3','JAN week4'], //this.onDemandLabel,
              datasets: [
                {
                  label: "Chef",
                  fill: true,
                  backgroundColor: gradientStroke,
                  hoverBackgroundColor: gradientStroke,
                  borderColor: "#e14eca",
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  data: this.onDemand_Chef_Data //[10000,20000,30000,40000] 
                },
                {
                  label: "Driver",
                  fill: true,
                  backgroundColor: gradientStrokepurple,
                  hoverBackgroundColor: gradientStrokepurple,
                  borderColor: "#ba54f5",
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  data: this.onDemand_Driver_Data //[9000,19000,29000,20000]
                }
                
              ]
            },
            options: this.gradientBarChartConfiguration
          };
        
          this.onDemandChartData = new Chart(this.ctx, this.config);
          this.onDemandChartData.data.labels = this.onDemandLabel;
          this.onDemandChartData.data.datasets[0].data = this.onDemand_Chef_Data; 
          this.onDemandChartData.data.datasets[1].data = this.onDemand_Driver_Data;
          this.onDemandChartData.update();
        }
      },
      err => {
        var userData = this.userDataService.getUserData();
        var index = userData.roles[0].name == "Sub admin" ? 1 : -1;
        if (err.error.code == 401 && index == 1) {
          this.showMessageError("your permission has been changed need to logout.");
        }
        else if (err.error.code == 424 && index == 1) {

        }
        else {
          this.showMessageError(err.error.message);
        }
      });

  }
  getReservationSaleDetails(type = 1, flag = 0) {
    this.isLoadingResults2 = true;
    this.reservationLabel = [];
    this.reservation_Data = [];
    var startdate = this.datePipe.transform('2021-01-01', 'YYYY-MM-dd', 'UTC', 'en-US')
    var enddate = this.datePipe.transform(new Date(), 'YYYY-MM-dd', 'UTC', 'en-US')
    let responseObs1 = this.dashboardService.getReservationSaleDetails(type, startdate, enddate);
    responseObs1.subscribe(
      data => {
        let response: any = data;
        if (response) {
          this.isLoadingResults2 = false;
          this.showReservationChart = false;
          // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);//pink color

          // gradientStroke.addColorStop(1, "rgba(253,93,147,0.8)");
          // gradientStroke.addColorStop(0, "rgba(253,93,147,0)");

          this.reservationLabel = [];
          this.reservation_Data = [];
          this.reservationSaleDetaills = response.data;
          console.log('this.reservationSaleDetaills[0]:..', this.reservationSaleDetaills);
          // if (flag == 0) {
           
          // }
          if (this.reservationSaleDetaills.hasOwnProperty('overview')) {
            if (this.reservationSaleDetaills['overview'].length > 0) {
              this.showReservationChart = true;
              this.reservationSaleDetaills['overview'].filter((element, i) => {
                this.reservationLabel.push(element.label);
                this.reservation_Data.push(element.value);
              });
            }
            else {
              this.reservationLabel = [];
              this.reservation_Data = [];
              if (type == 1 && flag !=2 ) {
                this.reservationLabel.push(new Date().toLocaleString('default', { month: 'long' }));
                this.reservation_Data.push(0);
                flag = 2;
              } else if (type == 2  && flag !=2) {
                this.reservationLabel.push(this.datePipe.transform(new Date(), 'YYYY'));
                this.reservation_Data.push(0);
                flag = 2;
              }
             
            }

          }
          if (this.reservationChartData) {
            this.reservationChartData.destroy();
          }
          var gradientStroke = this.ctx1.createLinearGradient(0, 230, 0, 50);
          gradientStroke.addColorStop(1, "rgba(225,78,202,0.4)");
          gradientStroke.addColorStop(0.8, "rgba(225,78,202,0.2)");
          gradientStroke.addColorStop(0, "rgba(225,78,202,0)");

         
          this.config1 = {
            type: "line",
            data: {
              labels:this.reservationLabel, //['JAN week1','JAN week2','JAN week3','JAN week4'],[2021,2022,2023,2024]
              datasets: [
                {
                  label: "Reservation",
                  fill: true,
                  backgroundColor: gradientStroke,
                  borderColor: "#e14eca",
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  pointBackgroundColor: "#e14eca",
                  pointBorderColor: "rgba(255,255,255,0)",
                  pointHoverBackgroundColor: "#e14eca",
                  //pointHoverBorderColor:'rgba(35,46,55,1)',
                  pointBorderWidth: 20,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 15,
                  pointRadius: 4,
                  data: this.reservation_Data //[19000,5000,49000,4000] 
                }
              ]
            },
            options: this.gradientChartOptionsConfigurationWithTooltipRed
          };


          this.reservationChartData = new Chart(this.ctx1, this.config1);
          this.reservationChartData.data.labels = this.reservationLabel;
          this.reservationChartData.data.datasets[0].data = this.reservation_Data;
          this.reservationChartData.update();
        }
      },
      err => {
        var userData = this.userDataService.getUserData();
        var index = userData.roles[0].name == "Sub admin" ? 1 : -1;
        if (err.error.code == 401 && index == 1) {
          this.showMessageError("your permission has been changed need to logout.");
        }
        else if (err.error.code == 424 && index == 1) {

        }
        else {
          this.showMessageError(err.error.message);
        }
      });

  }
  showMessageError(message) {
    this.toastr.show(
      '<span data-notify="icon" class="tim-icons icon-bell-55"></span>',
      message,
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }
  public updateOptions(id) {

  }
}
