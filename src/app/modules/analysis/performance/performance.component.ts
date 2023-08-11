import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { LookupService } from 'src/app/services/lookup/lookup.service';
import { BaseChartDirective } from 'ng2-charts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})

export class PerformanceComponent implements OnInit{
  @ViewChildren(BaseChartDirective) charts!: QueryList<BaseChartDirective>;
  @ViewChild('baseChart1', { static: true }) canvasElem1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('baseChart2', { static: true }) canvasElem2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('baseChart3', { static: true }) canvasElem3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('baseChart4', { static: true }) canvasElem4!: ElementRef<HTMLCanvasElement>;
  
  runtimeData: any[] = [];
  labelData: string[] = [];
  loadData: number[] = [];
  rpmData: number[] = [];
  speedData: number[] = [];
  bpData: number[] = [];
  torqueData: number[] = [];
  qiData: number[] = [];
  mffData: number[] =[];

  status = 'green'
  deviceType = ''
  avgCabinTemp = 0
  avgCabinHumid = 0
  avgEngTemp = 0
  smoke = 'No'
  smokeTime = ''
  alcohol = 'No'
  alcoholTime = ''
  avgLoad = 0
  avgBp = 0
  totalFuelConsumed = 0
  avgQi = 0
  avgnMech = 0
  avgnBth = 0
  avgBsfc = 0

  engineData: any[] = [];
  rpmLabelData: string[] = [];
  nMechData: number[] = [];
  nBthData: number[] = [];
  nIthData: number[] = [];
  bsfcData: number[] = [];
  isfcData: number[] = [];

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  dt = ""

  public chart1Data: ChartConfiguration<'line'>['data'] = {
    labels: this.labelData,
    datasets: [
      {
        data: this.loadData,
        label: 'Engine Load',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(255,0,0,1)',
        backgroundColor: 'rgba(255,0,0,0.5)',
        yAxisID: 'y-axis-l',
      },
      {
        data: this.rpmData,
        label: 'Engine speed (RPM)',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(255,128,0,1)',
        backgroundColor: 'rgba(255,128,0,0.3)',
        yAxisID: 'y-axis-r',
      },
    ],
  };

  public chart2Data: ChartConfiguration<'line'>['data'] = {
    labels: this.labelData,
    datasets: [
      {
        data: this.speedData,
        label: 'Vehicle Speed (kmph)',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(255,255,0,1)',
        backgroundColor: 'rgba(255,255,0,0.3)',
        yAxisID: 'y-axis-l',
      },
      {
        data: this.mffData,
        label: 'Mass of Fuel Used (g/s)',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(255,0,255,1)',
        backgroundColor: 'rgba(255,0,255,0.3)',
        yAxisID: 'y-axis-r',
      }
    ],
  };

  public chart3Data: ChartConfiguration<'line'>['data'] = {
    labels: this.labelData,
    datasets: [
      {
        data: this.bpData,
        label: 'Brake Power (kW)',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(0,255,0,1)',
        backgroundColor: 'rgba(0,255,0,0.3)',
      },
      {
        data: this.qiData,
        label: 'Heat Supplied (kW)',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(0,0,255,1)',
        backgroundColor: 'rgba(0,0,255,0.3)',
      },
    ]
  };
  
  public chart4Data: ChartConfiguration<'line'>['data'] = {
    labels: this.rpmLabelData,
    datasets: [
      {
        data: this.nMechData,
        label: 'Mechanical Effieciency (%)',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(255,0,0,1)',
        backgroundColor: 'rgba(255,0,0,0.3)',
        yAxisID: 'y-axis-l',
      },
      {
        data: this.nBthData,
        label: 'Brake Thermal Effieciency (%)',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(0,255,0,1)',
        backgroundColor: 'rgba(0,255,0,0.3)',
        yAxisID: 'y-axis-l',
      },
      {
        data: this.nIthData,
        label: 'Indicated Thermal Effieciency (%)',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(0,0,255,1)',
        backgroundColor: 'rgba(0,0,255,0.3)',
        yAxisID: 'y-axis-l',
      },
      {
        data: this.bsfcData,
        label: 'Specific Fuel Consumption (kg/kWh)',
        fill: false,
        tension: 0.5,
        borderColor: 'rgba(255,255,0,1)',
        backgroundColor: 'rgba(255,255,0,0.3)',
        yAxisID: 'y-axis-r',
      },
    ]
  };
  
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      'y-axis-l': {
        position: 'left',
        
      },
      'y-axis-r': {
        position: 'right',
      },
    },
  };
  public lineChartLegend = true;

  start_end_mark: number[][] = [];
  lat = 12.978842
  lng = 77.591711
  latlng: number[][] = [
    [
      12.978842,
      77.591711
    ],
    [
      12.978842,
      77.591711
    ]
  ];
  
  constructor(private lookupDataService: LookupService) {
    this.start_end_mark.push(this.latlng[0]);
    this.start_end_mark.push(this.latlng[this.latlng.length - 1]);
  }

  ngOnInit(): void {
    
  }

  getData(event: any) {
    this.lookupDataService.getDateWiseData(this.formatDate(this.dt)).subscribe((res: any) => {
      console.log(res);
      this.runtimeData = res.recordset;
      console.log(this.runtimeData);
      this.latlng = []
      var tempCabinTemp = 0
      var tempCabinHumid = 0
      var tempEngTemp = 0
      var tempLoad = 0
      var tempBp = 0
      var tempQi = 0
      var tempMff = 0
      var tempNMech = 0
      var tempNBth = 0
      var tempBSFC = 0

      for (let i = 0; i < this.runtimeData.length; i++) {
        this.deviceType = this.runtimeData[i].DEVICE_TYPE
        this.labelData.push(this.runtimeData[i].CHECKTIME)
        this.loadData.push(Number(this.runtimeData[i].ENGINE_LOAD))
        this.speedData.push(Number(this.runtimeData[i].VEHICLE_SPEED))
        this.rpmData.push(Number(this.runtimeData[i].ENGINE_SPEED))
        this.bpData.push(Number(this.runtimeData[i].BP))
        this.mffData.push(Number(this.runtimeData[i].MFF) * 1000)
        this.torqueData.push(Number(this.runtimeData[i].TORQUE))
        this.qiData.push(Number(this.runtimeData[i].HEAT_SUPPLIED))
        let tempLocVar = [
          Number(this.runtimeData[i].LATITUDE),
          Number(this.runtimeData[i].LONGITUDE),
        ]
        this.latlng.push(tempLocVar);
        tempCabinTemp += Number(this.runtimeData[i].OUTTEMP)
        tempCabinHumid += Number(this.runtimeData[i].HUMIDITY)
        tempEngTemp += Number(this.runtimeData[i].COOLANT_TEMP)
        tempLoad += Number(this.runtimeData[i].ENGINE_LOAD)
        tempBp += Number(this.runtimeData[i].BP)
        tempQi += Number(this.runtimeData[i].HEAT_SUPPLIED)
        tempMff += (Number(this.runtimeData[i].MFF) * 1000)
        tempNMech += Number(this.runtimeData[i].MECH_EFF)
        tempNBth += Number(this.runtimeData[i].BTH_EFF)
        tempBSFC += Number(this.runtimeData[i].BSFC)
        if (this.runtimeData[i].SMOKE === 'Yes') {
          this.smoke = 'Yes'
          this.smokeTime = this.runtimeData[i].CHECKTIME
        }
        if (this.runtimeData[i].ALCOHOL === 'Yes') {
          this.alcohol = 'Yes'
          this.alcoholTime = this.runtimeData[i].CHECKTIME
        }
      }

      this.avgCabinHumid = tempCabinHumid/this.runtimeData.length
      this.avgCabinTemp = tempCabinTemp/this.runtimeData.length
      this.avgEngTemp = tempEngTemp/this.runtimeData.length
      this.avgLoad = tempLoad/this.runtimeData.length
      this.avgBp = tempBp/this.runtimeData.length
      this.totalFuelConsumed = tempMff * 30
      this.avgQi = tempQi/this.runtimeData.length
      this.avgnMech = tempNMech/this.runtimeData.length
      this.avgnBth = tempNBth/this.runtimeData.length
      this.avgBsfc = tempBSFC/this.runtimeData.length

      this.lat = this.latlng[0][0]
      this.lng = this.latlng[0][1]

      this.charts.forEach((child) => {
        console.log(this.charts)
        child.chart!.update()
      });
    })

    this.lookupDataService.getRPMWiseData(this.formatDate(this.dt)).subscribe((res: any) => {
      console.log(res);
      this.engineData = res.recordset;
      console.log(this.engineData);

      for (let i = 0; i < this.engineData.length; i++) {
        this.rpmLabelData.push(this.engineData[i].ENGINE_SPEED)
        this.nMechData.push(Number(this.engineData[i].MECH_EFF))
        this.nBthData.push(Number(this.engineData[i].BTH_EFF))
        this.nIthData.push(Number(this.engineData[i].ITH_EFF))
        this.bsfcData.push(Number(this.engineData[i].BSFC))
      }

      this.charts.forEach((child) => {
        console.log(this.charts)
        child.chart!.update()
      });
    })
  }


  public async SavePDF(): Promise<void> {  
    const content = document.getElementById('map') as HTMLCanvasElement
    html2canvas(content, {useCORS: true}).then(canvas => {
      /*map = canvas.toDataURL('image/png');
      console.log(map)
      doc.addImage(map,'PNG', 30, 270, 425, 450);*/
      var doc = new jsPDF("portrait", "px", "a4");
      var img = new Image()
      img.src = 'assets/logos/humming-bird.png';
      doc.setFontSize(13)
      doc.setFont('Times New Roman','bold');
      doc.text('HUMS HEALTH & USAGE REPORT', 150, 25);
      doc.addImage(img, 'png', 10, 10, 35, 35);
      doc.line(20, 50, 425, 50);
      doc.setDrawColor(0);
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(20, 60, 200, 65, 5, 5, 'FD');
      //doc.roundedRect(150, 90, 150, 70, 5, 5, 'FD');
      doc.setFontSize(11)
      doc.setFont('Times New Roman','normal');
      doc.text('To,',30, 70);
      doc.text('Nooh Manzoor Ahamad',30, 80);
      doc.text('B-235, DS Max Solitaire, Horamavu Agara',30, 90);
      doc.text('Bengaluru - 560043',30, 100);
      doc.text('9740142021',30, 110);
      doc.text('noohmanzoor02@gmail.com',30, 120);
      var traffic = new Image()
      if (this.status === 'green'){
        traffic.src = 'assets/pics/green.png'
      } else if (this.status === 'amber'){
        traffic.src = 'assets/pics/amber.png'
      } else if (this.status === 'red'){
        traffic.src = 'assets/pics/red.png'
      }
      doc.addImage(traffic, 'png', 270, 60, 135, 50);
      doc.text(`Vehicle Performance: ${this.deviceType}`,30, 140);
      var vehBody = [
        [1, 'Cabin Temperature', `${this.avgCabinTemp} C`],
        [2, 'Cabin Humidity', `${this.avgCabinHumid} %`],
        [3, 'Engine Temperature', `${this.avgEngTemp} C`],
        [4, 'Smoke detected?', `${this.smoke}, ${this.smokeTime}`],
        [5, 'Alcohol detected?', `${this.alcohol}, ${this.alcoholTime}`],
      ]
      autoTable(doc, {
        startY: 150,                    
        theme: 'grid',
        headStyles: {
          fillColor: [32,42,68]
        },
        head: [['Sl. No', 'Parameter', 'Value']],
        body: vehBody,
        // bodyStyles: {lineColor: [0, 0, 0]}
      });
      doc.text('Vehicle Tracking:',30, 265);
      let map = new Image();
      map.src = canvas.toDataURL('image/png');
      console.log(map)
      doc.addImage(map,'PNG', 75, 275, 300, 300);
      doc.line(20, 600, 425, 600);
      doc.text('1',225, 615);
      doc.addPage()
      img.src = 'assets/logos/humming-bird.png';
      doc.setFontSize(13)
      doc.setFont('Times New Roman','bold');
      doc.text('HUMS HEALTH & USAGE REPORT', 150, 25);
      doc.addImage(img, 'png', 10, 10, 35, 35);
      doc.line(20, 50, 425, 50);
      doc.setFontSize(11)
      doc.setFont('Times New Roman','normal');
      doc.text('Engine Performance:', 30, 60);
      var engBody = [
        [1, 'Load on the Engine', `${this.avgLoad} %`],
        [2, 'Brake Power', `${this.avgBp} kW`],
        [3, 'Total Fuel Consumption', `${this.totalFuelConsumed} g`],
        [4, 'Mechanical Efficiency', `${this.avgnMech} %`],
        [5, 'Thermal Efficiency', `${this.avgnBth} %`],
        [6, 'Specific Fuel Consumption', `${this.avgBsfc} kg/kWhr`],
      ]
      autoTable(doc, {
        startY: 70,                    
        theme: 'grid',
        headStyles: {
          fillColor: [32,42,68]
        },
        head: [['Sl. No', 'Parameter', 'Value']],
        body: engBody,
        // bodyStyles: {lineColor: [0, 0, 0]}
      });
      doc.text('Performance graphs for 4-Stroke Engine compared to ideal values over a range of engine speed of 1000-6000 RPM',30, 200);
      let img1 = this.canvasElem1.nativeElement.toDataURL('image/png');
      doc.addImage(img1, 'PNG', 15, 210, 200, 200);
      var optImg = new Image()
      optImg.src = 'assets/graphs/performance-chart.png';
      doc.addImage(optImg, 'png', 225, 210, 200, 200);
      doc.text('Engine Load v/s Engine Speed',30, 425);
      let img2 = this.canvasElem2.nativeElement.toDataURL('image/png');
      doc.addImage(img2, 'PNG', 10, 430, 425, 155);
      doc.line(20, 600, 425, 600);
      doc.text('2',225, 615);
      doc.addPage()
      img.src = 'assets/logos/humming-bird.png';
      doc.setFontSize(13)
      doc.setFont('Times New Roman','bold');
      doc.text('HUMS HEALTH & USAGE REPORT', 150, 25);
      doc.addImage(img, 'png', 10, 10, 35, 35);
      doc.line(20, 50, 425, 50);
      doc.setFontSize(11)
      doc.setFont('Times New Roman','normal');
      doc.text('Vehicle speed v/s Instantaneous Fuel Consumption:', 30, 65);
      let img3 = this.canvasElem3.nativeElement.toDataURL('image/png');
      doc.addImage(img3, 'PNG', 10, 75, 425, 155);
      doc.text('Brake Power v/s Heat Supplied:', 30, 245);
      let img4 = this.canvasElem4.nativeElement.toDataURL('image/png');
      doc.addImage(img4, 'PNG', 10, 260, 425, 155);
      doc.text('Diagnostic Trouble codes:', 30, 430);
      var dtcBody = [[]]
      autoTable(doc, {
        startY: 440,                    
        theme: 'grid',
        headStyles: {
          fillColor: [32,42,68]
        },
        head: [['Sl. No', 'DTC Code', 'Subsystem', 'Code Type', 'Vehicle System', 'Fault']],
        body: dtcBody,
        // bodyStyles: {lineColor: [0, 0, 0]}
      });
      if (dtcBody.length === 1) {
        doc.text('No diagnostic trouble codes identified. Hence there is no problem with the vehicle.', 30, 500);
      }
      doc.line(20, 600, 425, 600);
      doc.text('3',225, 615);
      doc.output('dataurlnewwindow');
      doc.save(`${this.dt}.pdf`);  
      /*var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
      var x = window.open();
      x.document.open();
      x.document.write(iframe);
      x.document.close();*/
    });
  }

  formatDate(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [day, month, year].join('-');
  }
}
