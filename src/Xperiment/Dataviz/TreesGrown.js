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
        const sortedTrees =  trees.sort((b, a) =>
        {
            b.Value - a.Value
        })
        sortedTrees.reverse()

        let dimensions = {
            width: window.innerWidth * 0.4,
            height: window.innerWidth * 0.2,
            margin: {
            top: 30,
            right: 10,
            bottom: 50,
            left: 50,
            }
        }

        dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

        // 3. Draw canvas

        const wrapper = d3.select(".data-grown")
            .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)

        const bounds = wrapper
            .append("g")
            .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

        const xScale = d3.scaleBand()
            .range([ 0, dimensions.boundedWidth ])
            .domain(sortedTrees.map(d => d.Country))
            .padding(0.2)

        bounds.append("g")
            .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end");
        
          // Add Y axis
        const yScale = d3.scaleLinear()
            .domain([0, 20.8])
            .range([ dimensions.boundedHeight, 0])

        bounds.append("g")
            .call(d3.axisLeft(yScale))
        
          // Bars
        bounds.selectAll("mybar")
            .data(sortedTrees)
            .enter()
            .append("rect")
              .attr("x", d => xScale(d.Country))
              .attr("y", d => yScale(d.Trees))
              .attr("width", xScale.bandwidth())
              .attr("height", d => dimensions.boundedHeight - yScale(d.Trees))
              .attr("fill", "#146B3A")
        
        const tooltip = d3.select("#tooltip")
        const yAccessor = d => d.Trees

        // const onMouseEnter = (e, datum) => {
        //     console.log('from mouse hover', datum)

            // tooltip.select("#count")
            //     .text(sortedTrees.map(yAccessor(datum)))
            
            // const x = xScale(datum.x0)
            //     + (xScale(datum.x1) - xScale(datum.x0)) / 2
            //     + dimensions.margin.left
            // const y = yScale(yAccessor(datum))
            //     + dimensions.margin.top

            // tooltip.style("transform", `translate(`
            //     + `calc( -50% + ${x}px),`
            //     + `calc(-100% + ${y}px)`
            //     + `)`)

            // tooltip.style("opacity", 1)
        //   }

          
        // const onMouseLeave = () => {
        //     tooltip.style("opacity", 0)
        //   }
            
        // console.log(bounds.select("rect"))
        
        // bounds.select("rect")
        //     .on("mouseenter", onMouseEnter())
        //     .on("mouseleave", onMouseLeave())

    }
}