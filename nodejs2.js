const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
let seats = [];
const TOTAL_SEATS = 10; 
for (let i = 1; i <= TOTAL_SEATS; i++) {
  seats.push({ id: i, status: "available", lockedBy: null, lockExpiry: null });
}
function clearExpiredLocks() {
  const now = Date.now();
  seats.forEach(seat => {
    if (seat.status === "locked" && seat.lockExpiry <= now) {
      seat.status = "available";
      seat.lockedBy = null;
      seat.lockExpiry = null;
    }
  });
}
app.get("/seats", (req, res) => {
  clearExpiredLocks();
  res.json(seats);
});
app.post("  ", (req, res) => {
  clearExpiredLocks();
  const seatId = parseInt(req.params.id);
  const userId = req.body.userId;
  const seat = seats.find(s => s.id === seatId);
  if (!seat) return res.status(404).json({ error: "Seat not found" });
  if (seat.status === "available") {
    seat.status = "locked";
    seat.lockedBy = userId;
    seat.lockExpiry = Date.now() + 60 * 1000; // lock expires in 1 minute
    return res.json({ message: `Seat ${seatId} locked by user ${userId}`, seat });
  } else if (seat.status === "locked") {
    return res.status(400).json({ error: `Seat ${seatId} is already locked by another user` });
  } else if (seat.status === "booked") {
    return res.status(400).json({ error: `Seat ${seatId} is already booked` });
  }
});
app.post("/seats/:id/confirm", (req, res) => {
  clearExpiredLocks();
  const seatId = parseInt(req.params.id);
  const userId = req.body.userId;
  const seat = seats.find(s => s.id === seatId);
  if (!seat) return res.status(404).json({ error: "Seat not found" });
  if (seat.status === "locked" && seat.lockedBy === userId) {
    seat.status = "booked";
    seat.lockedBy = null;
    seat.lockExpiry = null;
    return res.json({ message: `Seat ${seatId} successfully booked by user ${userId}`, seat });
  } else if (seat.status === "locked" && seat.lockedBy !== userId) {
    return res.status(400).json({ error: `Seat ${seatId} is locked by another user` });
  } else if (seat.status === "available") {
    return res.status(400).json({ error: `Seat ${seatId} is not locked. Lock it first` });
  } else if (seat.status === "booked") {
    return res.status(400).json({ error: `Seat ${seatId} is already booked` });
  }
});
app.listen(PORT, () => {
  console.log(`Ticket Booking API running at http://localhost:${PORT}`);
});
