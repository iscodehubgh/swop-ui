import { Image } from 'antd';
import React, { useState } from 'react';

const CardImagePreviewer = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <React.Fragment>
      <Image
        preview={{ visible: false }}
        width='100%'
        height={150}
        src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
        onClick={() => setVisible(true)}
        style={{ objectFit: 'cover'  }}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
        </Image.PreviewGroup>
      </div>
    </React.Fragment>
  );
};

export default CardImagePreviewer;
