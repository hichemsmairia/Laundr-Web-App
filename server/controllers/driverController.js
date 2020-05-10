const Order = require("../models/Order");

//RETURNS ONLY TERMINATE THE CURRENT FUNCTION YOU DUMMY: aka the .then, catc, etc.
//awaiting on a promise guarantees the .then is executed right after

//initial pickup
const assignOrderPickup = async (req, res) => {
  let order_id = "";

  await Order.findOne({ "orderInfo.orderID": req.body.orderID })
    .then(async (order) => {
      /*console.log(
        "this should execute first, but it's last if you don't use await! woooah"
      );*/
      if (order) {
        if (order.pickupInfo.driverEmail === "N/A") {
          order_id = order._id;

          await Order.findByIdAndUpdate(
            order_id,
            {
              "pickupInfo.driverEmail": req.body.driverEmail,
              "orderInfo.status": 1,
            },
            { new: true }
          )
            .then((order) => {
              if (order) {
                return res.json({
                  success: true,
                  message: "Pickup driver assigned successfully",
                });
              } else {
                return res.json({
                  success: false,
                  message: "Error with assigning a pickup driver",
                });
              }
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: error,
              });
            });
        } else {
          return res.json({
            success: false,
            message: "Order already has a pickup driver",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Order could not be found",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
  /*
  console.log(
    "this should execute last, but it's first if you don't await! woooah"
  );*/
};

const updateOrderWeight = async (req, res) => {
  let order_id = "";

  await Order.findOne({ "orderInfo.orderID": req.body.orderID })
    .then(async (order) => {
      if (order) {
        if (order.orderInfo.weight === "N/A") {
          order_id = order._id;

          await Order.findByIdAndUpdate(
            order_id,
            {
              "orderInfo.weight": req.body.weight,
              "orderInfo.status": 2,
            },
            { new: true }
          )
            .then((order) => {
              if (order) {
                return res.json({
                  success: true,
                  message: "Weight entered for order successfully",
                });
              } else {
                return res.json({
                  success: false,
                  message: "Error with entering weight for order",
                });
              }
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: error,
              });
            });
        } else {
          return res.json({
            success: false,
            message: "Order already has a weight entered",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Order could not be found",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
};

const setWasherDelivered = async (req, res) => {
  let order_id = "";

  await Order.findOne({ "orderInfo.orderID": req.body.orderID })
    .then(async (order) => {
      if (order) {
        if (order.orderInfo.status === 2) {
          order_id = order._id;

          await Order.findByIdAndUpdate(
            order_id,
            {
              "orderInfo.status": 3,
            },
            { new: true }
          )
            .then((order) => {
              if (order) {
                return res.json({
                  success: true,
                  message: "Order successfully marked as dropped off to washer",
                });
              } else {
                return res.json({
                  success: false,
                  message: "Error with marking as dropped off to washer",
                });
              }
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: error,
              });
            });
        } else {
          return res.json({
            success: false,
            message: "Order does not have the correct status",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Order could not be found",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
};

const assignOrderDropoff = async (req, res) => {
  let order_id = "";

  await Order.findOne({ "orderInfo.orderID": req.body.orderID })
    .then(async (order) => {
      if (order) {
        if (order.dropoffInfo.driverEmail === "N/A") {
          order_id = order._id;

          await Order.findByIdAndUpdate(
            order_id,
            {
              "dropoffInfo.driverEmail": req.body.driverEmail,
              "orderInfo.status": 5,
            },
            { new: true }
          )
            .then((order) => {
              if (order) {
                return res.json({
                  success: true,
                  message: "Dropoff driver assigned successfully",
                });
              } else {
                return res.json({
                  success: false,
                  message: "Error with assigning a dropoff driver",
                });
              }
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: error,
              });
            });
        } else {
          return res.json({
            success: false,
            message: "Order already has a dropoff driver",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Order could not be found",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
};

const setUserDelivered = async (req, res) => {
  let order_id = "";

  await Order.findOne({ "orderInfo.orderID": req.body.orderID })
    .then(async (order) => {
      if (order) {
        if (order.orderInfo.status === 5) {
          order_id = order._id;

          await Order.findByIdAndUpdate(
            order_id,
            {
              "orderInfo.status": 6,
            },
            { new: true }
          )
            .then((order) => {
              if (order) {
                return res.json({
                  success: true,
                  message: "Order successfully marked as delivered to user",
                });
              } else {
                return res.json({
                  success: false,
                  message: "Error with marking as delivered to user",
                });
              }
            })
            .catch((error) => {
              return res.json({
                success: false,
                message: error,
              });
            });
        } else {
          return res.json({
            success: false,
            message: "Order does not have the correct status",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Order could not be found",
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });
};

module.exports = {
  assignOrderPickup,
  updateOrderWeight,
  setWasherDelivered,
  assignOrderDropoff,
  setUserDelivered,
};
