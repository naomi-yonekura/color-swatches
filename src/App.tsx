import { useCallback, useEffect, useState } from 'react'
import { Slider, Title, Text, Image, Grid, Container } from '@mantine/core';
import './App.css'

type swatchProps ={
  hsl: string,
  color: string,
  name: string, 
  image: string
}

function App() {
  const [colors, setColors] = useState<swatchProps[]>([])

  const [saturation, setSaturation] = useState(0)
  const [lightness, setLightness] = useState(0)

  const sliderMarks =[
    { value: 20, label: '20%' },
    { value: 50, label: '50%' },
    { value: 80, label: '80%' },
  ]

  /***
   * Function that asyncronously calls thecolorapi using hsl format to grab 36 possible colors with given saturation and lightness.
   * Hue is taken in steps of 10s to lower needed calls.
   * Colors are then filtered to remove reoccurring color names since not all hsl colors are unique.
  */ 
  const getColorHandler = useCallback(async () => {
    const getColors = []
    for (let i=1; i<=36; i++) {
      const response = await fetch(`https://www.thecolorapi.com/id?hsl=hsl(${i*10},${saturation},${lightness})`);
      const resData = await response.json();
      getColors.push({hsl: resData.hsl?.value, color: resData.rgb?.value, name: resData.name?.value, image: resData.image?.bare});
    }

    const filteredColors = [...new Map(getColors.map(color => [color.name, color])).values()]
    
    setColors(filteredColors);
  }, [lightness, saturation])
  

  useEffect(() => {
    getColorHandler()
  }, [saturation, lightness, getColorHandler])

  return (
    <>
      <Container m={4} size="80rem">
        <div style={{paddingBottom: "30px"}} >

          <Title order={2}>Saturation: {saturation}</Title>
          <Slider
            color="blue"
            size="xl"
            marks={sliderMarks}
            value={saturation}
            onChange={setSaturation}
             w={'rem(80)'}
          />
        </div>

        <div style={{paddingBottom: "30px"}}>
          <Title order={2}>Lightness: {lightness}</Title>
          <Slider
            color="red"
            size="xl"
            marks={sliderMarks}
            value={lightness}
            onChange={setLightness}
          />
        </div>

        <Grid>
          {
            colors ? colors.map((color, index) => {
              return(
                <Grid.Col span={1} key={index}>
                  <Image src={color.image} />
                  <Text>{color.name}</Text>
                </Grid.Col>
              )

            }): null}
        </Grid>
      </Container>
    </>
  )
}

export default App
