import {Avatar, Chip} from "@mui/material";
import {memo} from "react";

export const ColorChip = memo(({ color }) => {
  const style = { bgcolor: color };
  const avatar = <Avatar sx={style}> </Avatar>;
  return <Chip avatar={avatar} label={color} />;
});
