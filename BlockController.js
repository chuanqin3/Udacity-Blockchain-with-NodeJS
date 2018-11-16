const SHA256 = require('crypto-js/sha256');
const Block = require('./Block.js');
const Blockchain = require('./simpleChain.js');
const blockchain = new Blockchain();

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app
     */
    constructor(app) {
      this.app = app;
      this.blocks = [];
      this.initializeMockData();
      this.getBlockByHeight();
      this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByHeight() {
      this.app.get("/api/block/:height", async (req, res) => {
        try {
          const block = await blockchain.getBlock(req.params.height)
          if (block) {
            res.send(block)
          } else {
            res.status(404).json({
              success: false,
              message: `Block ${req.params.height} is not found.`
            })
          }
        } catch (error) {
          res.status(404).json({
            success: false,
            message: `Block ${req.params.height} is not found.`
          })
        }
      });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
      this.app.post("/api/block", (req, res) => {
        // Add your code here
        res.json({
          success: true,
          data: "test postNewBlock"
        })
      });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
      if(this.blocks.length === 0){
        for (let index = 0; index < 10; index++) {
          let blockAux = new Block(`Test Data #${index}`);
          blockAux.height = index;
          blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
          this.blocks.push(blockAux);
        }
      }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app
 */
module.exports = (app) => { return new BlockController(app);}
