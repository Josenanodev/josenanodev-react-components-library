import type { Meta, StoryObj } from "@storybook/react";
import ScrollSnapGallery from "../components/ScrollSnapGallery/ScrollSnapGallery";

import { BsHouseFill } from "react-icons/bs";

const meta: Meta<typeof ScrollSnapGallery> = {
  title: "ScrollSnapGallery",
  component: ScrollSnapGallery,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollSnapGallery>;

export const Default: Story = {
  args: {
    urls: [
      "https://ithemes.com/wp-content/uploads/2019/08/What-is-Your-Website-Design-Process-Blog-Post-Feature-Image-36119-01.png",
      "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/12/how-to-start-web-design-business.webp",
      "https://assets.telegraphindia.com/telegraph/2022/Sep/1663430911_untitled.jpg",
      "https://usabilitygeek.com/wp-content/uploads/2019/02/psychology-web-design-00-lead.jpg",
      "https://www.daac.in/blog/wp-content/uploads/2022/03/Future-of-Web-Designing.jpg",
      "https://static-cse.canva.com/blob/569638/20webdesignprinciplestofollowfeaturedimage.png",
      "https://www.ed2go.com/common/images/1/16302/web-design-classes/jpg.jpg",
      "https://kinsta.com/wp-content/uploads/2020/02/web-design-best-practices-1024x512.jpg",
    ],
  },
};

export const CabinsGallery: Story = {
  args: {
    urls: [
      "https://cimacalidez.mx/recursos/inicio/portadaCab1.png",
      "https://cimacalidez.mx/recursos/inicio/portadaCab2.png",
      "https://cimacalidez.mx/recursos/inicio/portadaCab3.png",
      "https://cimacalidez.mx/recursos/inicio/portadaCab4.png",
      "https://cimacalidez.mx/recursos/inicio/portadaCab5.png",
      "https://cimacalidez.mx/recursos/inicio/portadaCab6.png",
      "https://cimacalidez.mx/recursos/inicio/portadaCab1.png",
      "https://cimacalidez.mx/recursos/inicio/portadaCab2.png",
      "https://cimacalidez.mx/recursos/inicio/portadaCab3.png",
    ],
    frameStyle: {
      borderRadius: "4px",
      boxShadow: "3px 3px 4px 1px rgba(90, 90, 90, 0.30)",
    },
    IndicatorIcon: BsHouseFill,
    showArrows: true,
  },
};
