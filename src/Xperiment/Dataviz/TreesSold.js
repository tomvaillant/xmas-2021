import Xperiment from "../Xperiment"
import * as d3 from "../../../d3.v6"
import trees from "../../../data/trees_sold.json"

export default class TreesSold
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.dataset = d3.json(trees)

        this.drawLineChart()
    }

    drawLineChart(metric)
    {
      
        // Access Data
        const dateParser = d3.timeParse("%Y")
        const yAccessor = d => d.Sold
        const xAccessor = d => dateParser(d.Year)
        const treesAccessor = d => d.Sold
        const treesReal = trees.filter(i => i.Type === "Real")
        const treesFake = trees.filter(i => i.Type === "Fake")

        // 2. Create chart dimensions

        let dimensions = {
            width: window.innerWidth * 0.4,
            height: 300,
            margin: {
                top: 15,
                right: 15,
                bottom: 40,
                left: 60,
            },
        }
        dimensions.boundedWidth = dimensions.width
            - dimensions.margin.left
            - dimensions.margin.right
        dimensions.boundedHeight = dimensions.height
            - dimensions.margin.top
            - dimensions.margin.bottom

        // 3. Draw canvas

        const wrapper = d3.select(".data-trees")
            .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)

        const bounds = wrapper.append("g")
            .style("transform", `translate(${
                dimensions.margin.left
            }px, ${
                dimensions.margin.top
            }px)`)

        // 4. Create scales

        const yScale = d3.scaleLinear()
            .domain(d3.extent(trees, yAccessor))
            .range([dimensions.boundedHeight, 0])
            .nice()

        const xScale = d3.scaleTime()
            .domain(d3.extent(trees, xAccessor))
            .range([0, dimensions.boundedWidth])

        // // 5. Draw data

        const lineGenerator = d3.line()
            .x(d => xScale(xAccessor(d)))
            .y(d => yScale(yAccessor(d)))

        let lineReal = bounds.append("path")
            .attr("d", lineGenerator(treesReal))
            .attr("fill", "none")
            .attr("stroke", "#146B3A")
            .attr("stroke-width", 2)

        let lineFake = bounds.append("path")
            .attr("d", lineGenerator(treesFake))
            .attr("fill", "none")
            .attr("stroke", "#BB2528")
            .attr("stroke-width", 2)

        // // 6. Draw peripherals

        const yAxisGenerator = d3.axisLeft()
            .scale(yScale).tickFormat(d => `${d / 1000000}M`)

        const yAxis = bounds.append("g")
            .call(yAxisGenerator)

        const xAxisGenerator = d3.axisBottom()
            .scale(xScale)

        const xAxis = bounds.append("g")
            .call(xAxisGenerator)
            .style("transform", `translateY(${
                dimensions.boundedHeight
            }px)`)
        
    }
}