import Xperiment from "../Xperiment"
import * as d3 from "../../../d3.v6"
import trees from "../../../data/trees_grown.json"

export default class TreesSold
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.dataset = d3.json(trees)

        this.drawBarChart()
    }

    drawBarChart()
    {
        console.table(trees)

        const sortedTrees =  trees.sort((b, a) =>
        {
            return a.Value - b.Value;
        })

        console.log(sortedTrees)

        let dimensions = {
            width: window.innerWidth * 0.5,
            height: window.innerWidth * 0.3,
            margin: {
            top: 30,
            right: 10,
            bottom: 50,
            left: 50,
            },
        }
        dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

        // 3. Draw canvas

        const wrapper = d3.select(".data-grown")
            .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)

        const bounds = wrapper.append("g")
            .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)
            .attr("class", "bins")

        
        const x = d3.scaleBand()
            .range([0, dimensions.boundedWidth])
            .domain(sortedTrees.map((d) => { d.Country }))
            .padding(0.2)
        
        bounds.append("g")
            .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 21])
            .range([dimensions.boundedHeight, 0]);
        
        bounds.append("g")
            .call(d3.axisLeft(y))

        // Bars
        bounds.selectAll("bins")
        .data(sortedTrees)
        .enter()
        .append("rect")
            .attr("x", (d) => { x(d.Country) })
            .attr("y", (d) => { y(d.Value) })
            .attr("width", x.bandwidth())
            .attr("height", (d) => { dimensions.boundedHeight - y(d.Value) })
            .attr("fill", "#69b3a2")

        // // init static elements
        // bounds.append("g")
        //     .attr("class", "bins")
        // bounds.append("line")
        //     .attr("class", "mean")
        // bounds.append("g")
        //     .attr("class", "x-axis")
        //     .style("transform", `translateY(${dimensions.boundedHeight}px)`)
        //     .append("text")
        //     .attr("class", "x-axis-label")

        // // 4. Create scales

        // const metricAccessor = d => d.Country
        // const yAccessor = d => d.Trees

        // const xScale = d3.scaleLinear()
        //     .domain(d3.extent(trees, metricAccessor))
        //     .range([0, dimensions.boundedWidth])
        //     .nice()

        // const binsGenerator = d3.bin()
        //     .domain(xScale.domain())
        //     .value(metricAccessor)
        //     .thresholds(8)

        // const bins = binsGenerator(trees)

        // const yScale = d3.scaleLinear()
        //     .domain([0, d3.max(bins, yAccessor)])
        //     .range([dimensions.boundedHeight, 0])
        //     .nice()

        // // 5. Draw data

        // const barPadding = 1

        // let binGroups = bounds.select(".bins")
        //     .selectAll(".bin")
        //     .data(bins)

        // binGroups.exit()
        //     .remove()

        // const newBinGroups = binGroups.enter().append("g")
        //     .attr("class", "bin")

        // newBinGroups.append("rect")
        // newBinGroups.append("text")

        // // update binGroups to include new points
        // binGroups = newBinGroups.merge(binGroups)

        // console.log(yScale)
        // console.log(xScale)
        // const barRects = binGroups.select("rect")
        //     .attr("x", d => xScale(d.x0) + barPadding)
        //     .attr("y", d => yScale(yAccessor(d)))
        //     .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)))
        //     .attr("width", d => d3.max([
        //         0,
        //         xScale(d.x1) - xScale(d.x0) - barPadding
        //     ]))

        // const mean = d3.mean(dataset, metricAccessor)

        // const meanLine = bounds.selectAll(".mean")
        //     .attr("x1", xScale(mean))
        //     .attr("x2", xScale(mean))
        //     .attr("y1", -20)
        //     .attr("y2", dimensions.boundedHeight)

        // // 6. Draw peripherals

        // const xAxisGenerator = d3.axisBottom()
        //     .scale(xScale)

        // const xAxis = bounds.select(".x-axis")
        //     .call(xAxisGenerator)


        // const xAxisLabel = xAxis.select(".x-axis-label")
        //     .attr("x", dimensions.boundedWidth / 2)
        //     .attr("y", dimensions.margin.bottom - 10)
        //     .text("Humidity")

        // // 7. Set up interactions

        // binGroups.select("rect")
        //     .on("mouseenter", onMouseEnter)
        //     .on("mouseleave", onMouseLeave)

        // const tooltip = d3.select("#tooltip")
        // function onMouseEnter(e, datum) {
        //     tooltip.select("#count")
        //         .text(yAccessor(datum))

        //     const formatHumidity = d3.format(".2f")
        //     tooltip.select("#range")
        //         .text([
        //         formatHumidity(datum.x0),
        //         formatHumidity(datum.x1)
        //         ].join(" - "))

        //     const x = xScale(datum.x0)
        //     + (xScale(datum.x1) - xScale(datum.x0)) / 2
        //     + dimensions.margin.left
        //     const y = yScale(yAccessor(datum))
        //     + dimensions.margin.top

        //     tooltip.style("transform", `translate(`
        //     + `calc( -50% + ${x}px),`
        //     + `calc(-100% + ${y}px)`
        //     + `)`)

        //     tooltip.style("opacity", 1)
        // }

        // function onMouseLeave() {
        //     tooltip.style("opacity", 0)
        // }
    }
}