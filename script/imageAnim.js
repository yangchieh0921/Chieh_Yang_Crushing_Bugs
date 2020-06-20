(() => {
	console.log('fired');

	const thePieces = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

	let piecesBoard = document.querySelector('.puzzle-pieces');
	let puzzleBoard = document.querySelector('.puzzle-board');
	let puzzleSelectors = document.querySelectorAll('#buttonHolder img');
	let dropZones = document.querySelectorAll('.drop-zone');

	function createPuzzlePieces(pictureIndex) {

		thePieces.forEach((piece, index) => {
			let newPuzzlePiece = `<img id="piece${index}" class="puzzle-image"
				src="images/${piece + pictureIndex}.jpg" alt="puzzle piece" draggable> `;

			piecesBoard.innerHTML += newPuzzlePiece;
		});

		initDrag();
	}

	function initDrag() {
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				console.log('draggin...');
				e.dataTransfer.setData("text/plain", this.id);
			});
		 });
	}

	dropZones.forEach(zone => {
			zone.addEventListener("dragover", function(e) {
				e.preventDefault();
				console.log('dragged over me!');
			});

			zone.addEventListener("drop",function(e) {
				e.preventDefault();
				console.log('you dropped somethin on me!');

				let piece = e.dataTransfer.getData("text/plain");
				// bug1

				if(e.currentTarget.firstElementChild){
					let currentImage = e.currentTarget.firstElementChild;
					piecesBoard.appendChild(currentImage);

					console.log('you can change the images followed your mind.');
				}

				e.currentTarget.appendChild(document.querySelector(`#${piece}`));
			})
	})
	function resetPuzzlePieces(){

		piecesBoard.innerHTML = "";

		dropZones.forEach(zone => {
			zone.innerHTML = "" ;
		});

		createPuzzlePieces(this.dataset.puzzleref);
	}

	puzzleSelectors.forEach(button => button.addEventListener("click", resetPuzzlePieces));


	createPuzzlePieces(0);

})();
