import React from 'react'

function Product() {
  return (
    <div
              className="flex gap-y-4 py-4 game-list-images h-full"
              // style={{ width: "18vw" }}
            >
            <ImageWithLoader game={game[0]} selectedGame={selectedGame} StopProduct={StopProduct} handleProduct={handleProduct}
                style={{ maxWidth: "none" }}
                src={game[0]?.image_mobile}
                alt=""
                // onClick={() => startGameHandler(game[0])}
                onClick={() => {
              if (game[0].id || game[0].gameid) {
                if (selectedGame === game[0].id) {
                  StopProduct(game[0].id);
                } else if (ezSelect && selectedGame === game[0].gameid) {
                  StopProduct(game[0].gameid);
                } else {
                  handleProduct(game[0]);
                }
              }
            }}
              />
              {
                game[1]?
                <ImageWithLoader game={game[1]} selectedGame={selectedGame} StopProduct={StopProduct} handleProduct={handleProduct}
                  style={{ maxWidth: "none" }}
                  src={game[1]?.image_mobile}
                  alt=""
                  // onClick={() => startGameHandler(game[1])}
                  onClick={() => {
                if (game[1].id || game[1].gameid) {
                  if (selectedGame === game[1].id) {
                    StopProduct(game[1].id);
                  } else if (ezSelect && selectedGame === game[1].gameid) {
                    StopProduct(game[1].gameid);
                  } else {
                    handleProduct(game[1]);
                  }
                }
              }}
                />
                :null
              }
            </div>
  )
}

export default Product