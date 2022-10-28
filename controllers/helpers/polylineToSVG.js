module.exports = {
    toSVG: (polyString) => {
        let minX = 256, minY = 256, maxX = 0, maxY = 0
        let coordinates = decode(polyString)
        const svgPath = []

        for (let i = 0; i < coordinates.length; i++) {
            const point = latLng2point(...coordinates[i])
            minX = Math.min(minX, point.x)
            minY = Math.min(minY, point.y)
            maxX = Math.max(maxX, point.x)
            maxY = Math.max(maxY, point.y)
            svgPath.push([point.x, point.y].join(','))
        }

        const width = (maxX - minX) * 1.05
        const height = (maxY - minY) * 1.05
        const x = minX * 0.999995
        const y = minY * 0.999995
        const viewBox = `${x} ${y} ${width} ${height}`
        const strokeWidth = Math.max(width, height) * 0.005

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" height="400" width="400" viewport="0 0 400 400" viewBox="${viewBox}">
    <g>
    <path d="${`M${svgPath.join(' ')}`}" stroke="#fd7e14" stroke-width="${strokeWidth * 10}" stroke-opacity="25%" stroke-linejoin="round" fill="none" />
      <path d="${`M${svgPath.join(' ')}`}" stroke="#0d6efd" stroke-width="${strokeWidth}" fill="none" />
    </g>
  </svg>`

        return svg
    },
    toSVGObject: (polyString) => {
        let minX = 256, minY = 256, maxX = 0, maxY = 0
        let coordinates = decode(polyString)
        const svgPath = []

        for (let i = 0; i < coordinates.length; i++) {
            const point = latLng2point(...coordinates[i])
            minX = Math.min(minX, point.x)
            minY = Math.min(minY, point.y)
            maxX = Math.max(maxX, point.x)
            maxY = Math.max(maxY, point.y)
            svgPath.push([point.x, point.y].join(','))
        }

        const width = (maxX - minX) * 1.05
        const height = (maxY - minY) * 1.05
        const x = minX * 0.999995
        const y = minY * 0.999995
        const viewBox = `${x} ${y} ${width} ${height}`
        const strokeWidth = Math.max(width, height) * 0.005

//         const svg = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" height="400" width="400" viewport="0 0 400 400" viewBox="${viewBox}">
//     <g>
//     <path d="${`M${svgPath.join(' ')}`}" stroke="#fd7e14" stroke-width="${strokeWidth * 10}" stroke-opacity="25%" stroke-linejoin="round" fill="none" />
//       <path d="${`M${svgPath.join(' ')}`}" stroke="#0d6efd" stroke-width="${strokeWidth}" fill="none" />
//     </g>
//   </svg>`

        return {
            height: "400",
            width: "400",
            viewport: "0 0 400 400",
            viewBox: viewBox,
            path: "M" + svgPath.join(' '),
            pathSettings: [{ stroke: "#fd7e14", strokeWidth: `${strokeWidth * 10}`, strokeOpacity: "25%", strokeLinejoin: "round", fill: "none" },
                        { stroke: "#0d6efd", strokeWidth: `${strokeWidth}`, strokeOpacity: "25%", strokeLinejoin: "round", fill: "none" }]
        }
    },
    multiToSVG: (array) => {
        let minX = 256, minY = 256, maxX = 0, maxY = 0, paths = []
        for (let i = 0; i < array.length; i++) {
            let coordinates = decode(array[i])
            const svgPath = []

            for (let i = 0; i < coordinates.length; i++) {
                const point = latLng2point(...coordinates[i])
                minX = Math.min(minX, point.x)
                minY = Math.min(minY, point.y)
                maxX = Math.max(maxX, point.x)
                maxY = Math.max(maxY, point.y)
                svgPath.push([point.x, point.y].join(','))
            }
            paths.push(svgPath)
        }
        const width = (maxX - minX) * 1.05
        const height = (maxY - minY) * 1.05
        const x = minX * 0.999995
        const y = minY * 0.999995
        const viewBox = `${x} ${y} ${width} ${height}`
        const strokeWidth = Math.max(width, height) * 0.002

        let svg = `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" height="800" width="800" viewport="0 0 800 800" viewBox="${viewBox}">
    <g></g>`
        paths.forEach(e => svg += `<path d="${`M${e.join(' ')}`}" stroke="#fd7e14" stroke-width="${strokeWidth * 12}" stroke-opacity="5%" stroke-linejoin="round" fill="none" />`)
        paths.forEach(e => svg += `<path d="${`M${e.join(' ')}`}" stroke="#0d6efd" stroke-width="${strokeWidth}" fill="none" />`)
        svg += `</g>
        </svg>`
        return svg
    }
}

const decode = (encoded, mul = 1e5) => {
    // precision
    var inv = 1.0 / mul
    var decoded = []
    var previous = [0, 0]
    var i = 0

    // for each byte
    while (i < encoded.length) {
        // for each coord (lat, lon)
        var ll = [0, 0]

        for (var j = 0; j < 2; j++) {
            var shift = 0
            var byte = 0x20

            // keep decoding bytes until you have this coord
            while (byte >= 0x20) {
                byte = encoded.charCodeAt(i++) - 63
                ll[j] |= (byte & 0x1f) << shift
                shift += 5
            }

            // add previous offset to get final value and remember for next one
            ll[j] = previous[j] + (ll[j] & 1 ? ~(ll[j] >> 1) : (ll[j] >> 1))
            previous[j] = ll[j]
        }

        // scale by precision and chop off long coords
        decoded.push([ll[0] * inv, ll[1] * inv])
        // fixed - originally flipped the positions so
        // its lon,lat instead of lat,lon
    }

    // hand back the list of coordinates
    return decoded
}

const latLng2point = (lat, lng) => {
    return {
        x: (lng + 180) * (256 / 360),
        y: (256 / 2) - (256 * Math.log(Math.tan((Math.PI / 4) + ((lat * Math.PI / 180) / 2))) / (2 * Math.PI))
    }
}