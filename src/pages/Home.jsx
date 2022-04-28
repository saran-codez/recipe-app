import { motion } from "framer-motion";

import Popular from "../components/Popular";
import Veggie from "../components/Veggie";

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Popular />
      <Veggie />
    </motion.div>
  );
}

export default Home;
