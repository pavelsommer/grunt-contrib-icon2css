"use strict";

const path = require("path");
const pretty = require("PrettyCSS");

module.exports = function (grunt) {
	const encodeSVG = (content) => {
		return content
			.replace(
				"<svg",
				~content.indexOf("xmlns")
					? "<svg"
					: '<svg xmlns="http://www.w3.org/2000/svg"'
			)
			.replaceAll(/"/g, "'")
			.replaceAll(/%/g, "%25")
			.replaceAll(/#/g, "%23")
			.replaceAll(/{/g, "%7B")
			.replaceAll(/}/g, "%7D")
			.replaceAll(/</g, "%3C")
			.replaceAll(/>/g, "%3E")
			.replaceAll(/\s+/g, "%20")
			.replaceAll(/&/g, "%26")
			.replaceAll("|", "%7C")
			.replaceAll("[", "%5B")
			.replaceAll("]", "%5D")
			.replaceAll("^", "%5E")
			.replaceAll("`", "%60")
			.replaceAll(";", "%3B")
			.replaceAll("?", "%3F")
			.replaceAll(":", "%3A")
			.replaceAll("@", "%40")
			.replaceAll("=", "%3D")
			.replaceAll("'", "%22")
			.replaceAll("/", "%2F")
			.replaceAll(",", "%2C");
	};

	const encodeBase64 = (content) => content.toString("base64");

	grunt.registerMultiTask("icon2css", "SVG to CSS data uri", function () {
		const outputName = this.data.output || "icons.css";

		const defaults = {
			encode: "xml",
			selector: ".$1",
			customcss: "",
			colors: [],
		};

		let options = this.data.options || {
			encode: defaults.encode,
			selector: defaults.selector,
			customcss: defaults.customcss,
			colors: defaults.colors,
		};

		options.encode = options.encode || defaults.encode;
		options.selector = options.selector || defaults.selector;
		options.customcss = options.customcss || defaults.customcss;
		options.colors = options.colors || [];

		this.files.forEach((file) => {
			const outputPath = path.normalize(path.join(file.orig.dest, outputName));

			grunt.file.write(outputPath, "");
		});

		this.files.forEach(function (file) {
			const outputPath = path.normalize(path.join(file.orig.dest, outputName));
			const fileName = path.parse(file.src[0]).name;

			let inputContent = grunt.file.read(file.src);

			options.colors.forEach((color) => {
				inputContent =
					typeof color.replace === "undefined"
						? inputContent.replace(/fill="#\d{6}"/g, `fill="${color.color}"`)
						: inputContent.replaceAll(
								`fill="${color.color}"`,
								`fill="${color.replace}"`
						  );

				console.log(inputContent);
			});

			let outputContent = grunt.file.read(outputPath);
			let encodedContent = "";
			let outputMethod = ",";

			grunt.log.writeln(`processing: ${fileName}`);

			switch (options.encode) {
				case "base64":
					encodedContent = encodeBase64(Buffer.from(inputContent));
					outputMethod = ";base64,";

					break;

				default:
					encodedContent = encodeSVG(inputContent);
					outputMethod = ";charset%3DUS-ASCII,";

					break;
			}

			outputContent += (outputContent || "") === "" ? "" : "\r\n\r\n";
			outputContent += options.selector.join(",").replaceAll("$1", fileName);
			outputContent +=
				" {" +
				options.customcss +
				`background-image: url('data:image/svg+xml` +
				outputMethod +
				encodedContent +
				`');}`;

			grunt.file.write(
				outputPath,
				pretty.parse(outputContent, {
					selector_comma: ",\r\n",
				})
			);
		});
	});
};
