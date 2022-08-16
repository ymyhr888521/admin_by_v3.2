<script>
import * as pdfjs from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { degrees, PDFDocument, rgb } from "pdf-lib";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import fontkit from "@pdf-lib/fontkit";
import { ref } from "vue";
export default {
	name: "PdfText",
	setup() {
		//pdf转成的图片文件，保存在数组中
		const imgFiles = ref([]);

		//pdf的名字，记录下来
		const pdfName = ref("");

		//加载文件的结果集
		const result = ref("");
		//选择文件的处理
		const handlePdf = e => {
			let filePaths = e.target.files;
			//清空原有缩略图
			if (filePaths.length === 0) {
				//未选择，则返回
				return false;
			}
			imgFiles.value.length = 0;

			let file = e.target.files[0];

			pdfName.value = file.name.substring(0, file.name.lastIndexOf("."));

			const reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = () => {
				//把读取到的结果集保存到result
				result.value = reader.result;

				const loadingTask = pdfjs.getDocument(reader.result);
				loadingTask.promise.then(pdf => {
					let pageNum = pdf.numPages;

					//准备图片
					for (let i = 1; i <= pageNum; i++) {
						let one = { id: i, imgSrc: "" };
						imgFiles.value.push(one);
					}

					let maxHeight = 0;
					//处理
					for (let i = 1; i <= pageNum; i++) {
						pdf.getPage(i).then(page => {
							const canvas = document.getElementById("pdf_canvas_" + i);
							const ctx = canvas.getContext("2d");
							const viewport = page.getViewport({ scale: 1 });
							// 画布大小,默认值是width:300px,height:150px
							canvas.height = viewport.height;
							canvas.width = viewport.width;
							//显示为图片的目标宽度
							const destWidth = 263;
							canvas.style.width = destWidth + "px";
							// 根据pdf每页的宽高比例设置canvas的高度
							let destHeight = destWidth * (viewport.height / viewport.width);
							canvas.style.height = destHeight + "px";
							page.render({
								canvasContext: ctx,
								viewport
							});

							//如果目标高度更高，则调整每个canvas的高度，使显示高度统一
							if (destHeight > maxHeight) {
								maxHeight = destHeight;
								for (let i = 0; i < pageNum; i++) {
									let canvas = document.getElementById("div_" + i);
									console.log("canvas name:" + "div_" + i);
									console.log(canvas);
									canvas.style.height = maxHeight + "px";
								}
							}
						});
						//加载完成
					} // end for

					setTimeout(() => {
						downPdf();
					}, 200);
				});
			};
		};
		//下载的pdf,下载添加文字水印
		const downPdf = async () => {
			//判断是否选择了pdf文件
			if (imgFiles.value.length <= 0) {
				alert("请先选择pdf文件");
				return false;
			}

			const pdfDoc = await PDFDocument.load(result.value);
			const pages = pdfDoc.getPages();

			// 自定义字体挂载
			pdfDoc.registerFontkit(fontkit);

			let defaultFontBuffer = await fetch("/font/simhei.ttf").then(res => res.arrayBuffer());
			const helveticaFont = await pdfDoc.embedFont(defaultFontBuffer);
			//加文本，演示时只加在了第一页

			for (let i in pages) {
				const currentPage = pages[i];

				const { height } = currentPage.getSize();
				for (let i = 0; i < 10; i++) {
					for (let j = 0; j < 3; j++) {
						currentPage.drawText("@JOKER L", {
							x: 230 * j,
							y: (height / 4) * i,
							size: 36,
							font: helveticaFont, //这里使用的是自定义字体
							//使用上面定义好的内置字体 font:helveticaFont
							color: rgb(0.9, 0.1, 0.1),
							rotate: degrees(-25),
							opacity: 0.3
						});
					}
				}
			}

			const pdfBytes = await pdfDoc.save();
			saveByteArray(pdfName.value + "_" + timeFormat() + ".pdf", pdfBytes);
		};

		//保存pdf并下载
		const saveByteArray = (reportName, byte) => {
			let blob = new Blob([byte], { type: "application/pdf" });
			let link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			let fileName = reportName;
			link.download = fileName;
			link.click();
			window.open(window.URL.createObjectURL(blob));
		};

		//补0
		const add0 = m => {
			return m < 10 ? "0" + m : m;
		};

		//格式化时间
		const timeFormat = () => {
			let time = new Date();
			let y = time.getFullYear();
			let m = time.getMonth() + 1;
			let d = time.getDate();
			let h = time.getHours();
			let mm = time.getMinutes();
			let s = time.getSeconds();
			let res = y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s);
			return res;
		};

		return {
			handlePdf,
			downPdf,
			imgFiles
		};
	}
};
</script>

<template>
	<div>
		<div style="width: 800px; margin: auto">
			<div>
				选择pdf:
				<input type="file" ref="hiddenfile" accept="application/pdf" @change="handlePdf" class="hiddenInput" />
			</div>
			<div style="width: 800px; margin-top: 10px; font-size: 12px">
				<el-button type="info" @click="downPdf" plain style="width: 400px">保存并下载pdf</el-button>
			</div>
			<div style="width: 800px; margin-top: 20px">
				<div
					v-for="(item, i) in imgFiles"
					:key="i"
					:id="`div_${i}`"
					style="position: relative; float: left; width: 265px; overflow: hidden"
				>
					<canvas :id="`pdf_canvas_${item.id}`" style="float: left; border: 1px solid #eeeeee"></canvas>
				</div>
			</div>
		</div>
	</div>
</template>
