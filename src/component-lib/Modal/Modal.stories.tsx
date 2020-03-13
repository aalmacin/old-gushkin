import React from "react";
import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
  decorators: []
};

export const Normal = () => (
  <Modal>
    <p>Hello Modal</p>
  </Modal>
);
