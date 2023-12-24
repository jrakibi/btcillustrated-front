import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Edge, Node, Layout } from '@swimlane/ngx-graph';

interface MyNode extends Node {
  label: string;
  data: any;
  fixedWidth: number;
  dynamicHeight: number; // Add this new property

  // You may need to add these properties based on the layout calculation ngx-graph performs
}

interface MyLink extends Edge {
  label?: string;
}

@Component({
  selector: 'app-mind-mapper',
  templateUrl: './mind-mapper.component.html',
  styleUrls: ['./mind-mapper.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MindMapperComponent implements OnInit {
  width = 2000; // Example width
  height = 1000; // Example height
  nodes: MyNode[] = [];
  links: MyLink[] = [];
  layout: String | Layout = 'dagre';
  idCounter = 0; // Counter to keep track of unique IDs for nodes and links

  private jsonData = {
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


  ngOnInit(): void {
    const graphData = this.transformToGraphData(this.jsonData);
    this.nodes = graphData.nodes;
    this.links = graphData.links;
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
      dynamicHeight: estimatedHeight // Set the estimated height
    };
    nodes.push(rootNode);

    jsonData.details.forEach(detail => {
      let estimatedHeight = this.estimateHeight(detail.title, 200);

      const detailNode: MyNode = {
        id: this.generateId(),
        label: detail.title,
        data: { explanations: detail.explanations },
        fixedWidth: 200, // Set this to your desired width
        dynamicHeight: estimatedHeight // Set the estimated height
      };
      nodes.push(detailNode);

      links.push({
        id: this.generateId(),
        source: rootNode.id,
        target: detailNode.id,
        label: '' // Optional: add a label if needed
      });

      detail.explanations.forEach(exp => {
      let estimatedHeight = this.estimateHeight(exp, 500);

        const explanationNode: MyNode = {
          id: this.generateId(),
          label: exp,
          data: {},
          fixedWidth: 500, // Set this to your desired width
          dynamicHeight: estimatedHeight // Set the estimated height
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
    if(lineCount == 1) {
      return 40
    }
    return lineCount * lineHeight;
  }
}
