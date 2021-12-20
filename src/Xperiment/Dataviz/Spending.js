import Xperiment from "../Xperiment"
import * as d3 from "../../../d3.v6"
import spending from "../../../data/xmas_spending.json"

export default class Spending
{
    constructor()
    {
        this.xperiment = new Xperiment()

        this.drawLineChart()
    }

    drawLineChart()
    {
        // Access Data
        const dateParser = d3.timeParse("%Y")
        const yAccessor = d => d.Spend
        const xAccessor = d => dateParser(d.Year)

        // 2. Create chart dimensions
        let dimensions = {
            width: window.innerWidth * 0.5,
            height: 400,
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

        const wrapper = d3.select(".data-spending")
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
            .domain(d3.extent(spending, yAccessor))
            .range([dimensions.boundedHeight, 0])
            .nice()

        const xScale = d3.scaleTime()
            .domain(d3.extent(spending, xAccessor))
            .range([0, dimensions.boundedWidth])

        // // 5. Draw data

        const lineGenerator = d3.line()
            .x(d => xScale(xAccessor(d)))
            .y(d => yScale(yAccessor(d)))

        let line = bounds.append("path")
            .attr("d", lineGenerator(spending))
            .attr("fill", "none")
            .attr("stroke", "#af9358")
            .attr("stroke-width", 2)

        // // 6. Draw peripherals

        const yAxisGenerator = d3.axisLeft()
            .scale(yScale)

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