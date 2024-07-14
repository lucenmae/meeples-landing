import { motion } from "framer-motion";

const Tile = () => {
  return (
    <motion.div
      whileHover={{
        zIndex: 0,
        backgroundColor: "#f3cc15",
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="aspect-square border border-gray-900"
      style={{ position: "relative" }}
    />
  );
};

export default Tile;
