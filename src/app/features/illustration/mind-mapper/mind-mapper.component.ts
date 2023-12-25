import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Edge, GraphComponent, Node } from '@swimlane/ngx-graph';
import { LnurlPayDialogComponent } from '../lnurl-pay-dialog/lnurl-pay-dialog.component';
import { HeaderOptions } from 'src/app/shared/header/header-options';
import { FormGroup, FormControl } from '@angular/forms';
import { OpenaiService } from 'src/app/core/service/open-ai.service';
import { AppContext } from 'src/app/core/service/app-context';
import { MindMapperResponse } from 'src/app/core/model/ai-interfaces';

interface MyNode extends Node {
  label: string;
  data: any;
  fixedWidth: number;
  dynamicHeight: number; // Add this new property
  level: number;
  // You may need to add these properties based on the layout calculation ngx-graph performs
}

interface MindMap {
  title: string;
  imageUrl: string;
  tag: string;
}
interface Layout {
  title: string;
  imageUrl: string;
  tag: string;
}

interface MyLink extends Edge {
  label?: string;
}
@Component({
  selector: 'app-mind-mapper',
  templateUrl: './mind-mapper.component.html',
  styleUrls: ['./../illustration-list/illustration-search/illustration-search.component.css', './mind-mapper.component.css',],
})
export class MindMapperComponent implements OnInit {
  // width = 2000; // Example width
  // height = 1000; // Example height
  width = 100; // 100% of the viewport width
  height = 80; // 80% of the viewport height, leaving some space for headers and footers

  nodes: MyNode[] = [];
  links: MyLink[] = [];
  layout: String | Layout = 'dagre';
  idCounter = 0; // Counter to keep track of unique IDs for nodes and links
  mindMaps: MindMap[] = [];
  layoutsMindMapper: Layout[] = [];
  showTags: boolean = true;

  form: FormGroup;

  headerOptions: HeaderOptions
  public jsonData = {
    "title": "assumeUTXO",
    "summary": "assumeUTXO is a tool used in Bitcoin development to simulate the state of the Unspent Transaction Output (UTXO) set.",
    "details": [
      {
        "title": "Simulating UTXO Set",
        "explanations": [
          "The UTXO set represents all the unspent transaction outputs in the Bitcoin network.",
          "assumeUTXO is a tool that allows developers to create a simulated UTXO set for testing purposes.",
          "This tool helps developers analyze and understand the behavior of their code without interacting with the real Bitcoin network."
        ]
      },
      {
        "title": "Testing Bitcoin Code",
        "explanations": [
          "assumeUTXO is particularly useful for testing Bitcoin code that relies on the state of the UTXO set.",
          "Developers can use assumeUTXO to create specific scenarios and test how their code handles different UTXO states.",
          "By simulating different UTXO sets, developers can ensure their code functions correctly in various scenarios."
        ]
      },
      {
        "title": "Debugging and Optimization",
        "explanations": [
          "assumeUTXO can also be used for debugging and optimizing Bitcoin code.",
          "Developers can simulate specific UTXO sets to identify potential issues or bottlenecks in their code.",
          "By analyzing the behavior of their code with different UTXO sets, developers can make improvements and optimize performance."
        ]
      }
    ]
  }

  constructor(public dialog: MatDialog,
    private appContext: AppContext,
    private openaiService: OpenaiService
  ) {
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      userInput: new FormControl(''),
      workflow: new FormControl(''), // Assuming single selection for simplicity
      tone: new FormControl(''), // Assuming single selection for simplicity
    });

    const mindMapData: MindMapperResponse = this.appContext.retrieveMindMapperData();
    if (mindMapData) {
      this.jsonData = mindMapData; // Assign the dynamic data to the jsonData property
      const graphData = this.transformToGraphData(this.jsonData);
      this.nodes = graphData.nodes;
      this.links = graphData.links;
      this.headerOptions = {
        isUnderlineDisplayed: true,
        isSlideShow: true,
        isDarkMode: true,
      }
      this.mindMaps = [
        {
          title: 'Mind Map 1',
          imageUrl: 'assets/btcIllustrated/mindmap/test.png',
          tag: 'Notes'
        },
        {
          title: 'Mind Map 2',
          // imageUrl: 'https://source.unsplash.com/random/200x120',
          imageUrl: 'assets/btcIllustrated/mindmap/test.png',
          tag: 'Mind Map'
        },
        {
          title: 'Mind Map 3',
          // imageUrl: 'https://source.unsplash.com/random/200x120',
          imageUrl: 'assets/btcIllustrated/mindmap/test.png',
          tag: 'Chart'
        }
        // ...add more if needed
      ];


      this.layoutsMindMapper = [
        {
          title: 'Mind Map 2',
          // imageUrl: 'https://source.unsplash.com/random/200x120',
          imageUrl: 'assets/btcIllustrated/mindmap/mindmap.png',
          tag: 'Ver1'
        },
        {
          title: 'Mind Map 3',
          // imageUrl: 'https://source.unsplash.com/random/200x120',
          // imageUrl: null,
          imageUrl: 'assets/btcIllustrated/mindmap/notes.png',
          tag: 'Ver2'
        },
        {
          title: 'Mind Map 1',
          // imageUrl: null,
          imageUrl: 'assets/btcIllustrated/mindmap/chart.png',
          tag: 'Ver3'
        },
      ];
    } else {
      // Handle the case where there is no data
      console.error('No data available for the Mind Map');
      // Redirect back to home or display a message
    }


  }

  submitData() {
    debugger
    if (this.form.valid) {
      const userInput = this.form.get('userInput').value;
      this.openaiService.getMindMapper(userInput).subscribe({
        next: (response) => {
          debugger

        },
        error: (err) => {
          debugger
          console.error('Error generating mind map:', err);
        }
      });
    }
  }

  private generateId(): string {
    return `node-${this.idCounter++}`; // Increment the counter after use
  }

  private transformToGraphData(jsonData): { nodes: MyNode[], links: MyLink[] } {
    const nodes: MyNode[] = [];
    const links: MyLink[] = [];
    let estimatedHeight = this.estimateHeight(jsonData.title, 300);

    const rootNode: MyNode = {

      id: this.generateId(),
      label: jsonData.title,
      data: { summary: jsonData.summary },
      fixedWidth: 300, // Set this to your desired width
      dynamicHeight: estimatedHeight + 40, // Set the estimated height
      level: 0
    };
    nodes.push(rootNode);

    jsonData.details.forEach(detail => {
      let estimatedHeight = this.estimateHeight(detail.title, 200);

      const detailNode: MyNode = {
        id: this.generateId(),
        label: detail.title,
        data: { explanations: detail.explanations },
        fixedWidth: 200, // Set this to your desired width
        dynamicHeight: estimatedHeight + 40, // Set the estimated height
        level: 1
      };
      nodes.push(detailNode);

      links.push({
        id: this.generateId(),
        source: rootNode.id,
        target: detailNode.id,
        label: '' // Optional: add a label if needed
      });

      detail.explanations.forEach(exp => {
        let estimatedHeight = this.estimateHeight(exp, 500) + 40;

        const explanationNode: MyNode = {
          id: this.generateId(),
          label: exp,
          data: {},
          fixedWidth: 500, // Set this to your desired width
          dynamicHeight: estimatedHeight, // Set the estimated height
          level: 2
        };
        nodes.push(explanationNode);

        links.push({
          id: this.generateId(),
          source: detailNode.id,
          target: explanationNode.id
        });
      });
    });

    return { nodes, links };
  }
  calculateCustomPath(link: MyLink): string {
    // Get the source and target nodes based on the IDs in the link
    const sourceNode = this.nodes.find(node => node.id === link.source);
    const targetNode = this.nodes.find(node => node.id === link.target);

    // Calculate the start and end points for the path
    const startPoint = {
      x: sourceNode.position.x + sourceNode.dimension.width,
      y: sourceNode.position.y + sourceNode.dimension.height / 2
    };
    const endPoint = {
      x: targetNode.position.x,
      y: targetNode.position.y + targetNode.dimension.height / 2
    };

    // Calculate control points for the curve
    const controlPoint1 = { x: (startPoint.x + endPoint.x) / 2, y: startPoint.y };
    const controlPoint2 = { x: (startPoint.x + endPoint.x) / 2, y: endPoint.y };

    // Create a path string for the SVG 'path' element with a cubic Bezier curve
    return `M${startPoint.x},${startPoint.y} C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${endPoint.x},${endPoint.y}`;
  }


  private estimateHeight(text: string, nodeWidth: number): number {
    debugger
    const lineHeight = 20; // Set an approximate line height
    const charsPerLine = nodeWidth / 10; // Estimate chars per line based on an average character width
    const lineCount = Math.ceil(text.length / charsPerLine);
    if (lineCount == 1) {
      return 40
    }
    return lineCount * lineHeight;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LnurlPayDialogComponent,

    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


  showDropdown: string | null = null;


  toggleDropdown(dropdownKey: string) {
    debugger
    this.showDropdown = this.showDropdown === dropdownKey ? null : dropdownKey;
  }

  selectDropdownOption(dropdownKey: string, option: string) {
    debugger

    this.form.get(dropdownKey).setValue(option);
    this.showDropdown = null; // Hide dropdown after selection
  }

  @ViewChild(GraphComponent) graphComponent: GraphComponent;
  zoomLevel: number = 1.0;
  zoomStep: number = 0.1;
  zoomIn(): void {
    this.zoomLevel = Math.min(this.zoomLevel + this.zoomStep, 2); // max zoom level 2
    this.graphComponent.zoomTo(this.zoomLevel);
  }

  zoomOut(): void {
    this.zoomLevel = Math.max(this.zoomLevel - this.zoomStep, 0.5); // min zoom level 0.5
    this.graphComponent.zoomTo(this.zoomLevel);
  }
}
