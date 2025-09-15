import React from "react";
import "./style.css";
import {
  FaInstagram,
  FaMedium,
} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { socialprofils } from "../../content_option";

const ICON_MAPPING = {
  medium: FaMedium,
  instagram: FaInstagram,
  substack: SiSubstack,
};

export const Socialicons = (params) => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {Object.entries(socialprofils).map(([platform, url]) => {
          const IconComponent = ICON_MAPPING[platform] || ICON_MAPPING.default;
          return (
            <li key={platform}>
              <a href={url} target="_blank" rel="noopener noreferrer" >
                <IconComponent />
              </a>
            </li>
          );
        })}
      </ul>
      <p>Follow Me</p>
    </div>
  );
};
