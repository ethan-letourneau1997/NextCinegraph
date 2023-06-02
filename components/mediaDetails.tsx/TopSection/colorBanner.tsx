import {
  AspectRatio,
  BackgroundImage,
  Box,
  Container,
  Flex,
  Grid,
  Group,
  Spoiler,
  Text,
  Title,
} from "@mantine/core";
import { darkenColorForContrast, hexToRGBA, rgbToHex } from "@/utils";

import { BsFillStarFill } from "react-icons/bs";
import Image from "next/image";
import { MediaItemType } from "../../../../types";
import { Palette } from "color-thief-react";
import { useMediaQuery } from "@mantine/hooks";

interface colorBanner {
  items: MediaItemType;
  mediaType: string;
}

export default function ColorBanner({ items, mediaType }: colorBanner) {
  // responsive styles
  const desktop = useMediaQuery("(min-width: 768px)");

  const imgSrc = `http://image.tmdb.org/t/p/w780${items.poster_path}`;
  const backdrop = `http://image.tmdb.org/t/p/original${items.backdrop_path}`;

  return (
    <Palette
      src={imgSrc}
      crossOrigin="anonymous"
      format="rgbArray"
      colorCount={2}
      quality={5}
    >
      {({ data, loading }) => {
        if (!items) return <div>Loading...</div>;

        const handleColor = (data: any) => {
          test = rgbToHex(data[0]);
          test = darkenColorForContrast(test, "#A1A1AA", 20);
          test = hexToRGBA(test, 0.9);
        };
        // const style = calculateAverageColor(data);
        let test;
        {
          // data
          //   ? (test = `rgb(${data[0][0]}, ${data[0][1]},${data[0][2]}, .7)`)
          //   : null;
        }

        {
          data ? handleColor(data) : null;
        }

        // test = darkenColorForContrast(test, "#FAFAFA", 4.5);

        return (
          <div>
            {/* <LetterBoxd items={items} mediaType="movie" /> */}
            <BackgroundImage src={backdrop}>
              <AspectRatio ratio={16 / 5.5}>
                <Box bg={test}>
                  <Container size="xl" h="100%" w="100%" pt="xl">
                    <Grid px={40} gutter="xl">
                      <Grid.Col span={3}>
                        <AspectRatio ratio={2 / 3}>
                          <Image
                            fill
                            alt=""
                            src={`https://image.tmdb.org/t/p/original${items.poster_path}`}
                            style={{
                              borderRadius: "4px",
                              border: ".5px solid #71717A",
                            }}
                          ></Image>
                        </AspectRatio>
                      </Grid.Col>
                      <Grid.Col span={9}>
                        <Box>
                          <Title size="h2">{items.title}</Title>
                          <Group spacing="md" mt={2} pl={5}>
                            <Group spacing={4}>
                              <BsFillStarFill color="#ffd452" />
                              <Text fw={600}>
                                {items.vote_average?.toFixed(1)}
                              </Text>
                            </Group>
                            <Text c="brand.3" fw={500}>
                              {" "}
                              {items.release_date?.substring(0, 4) ||
                                items.first_air_date?.substring(0, 4)}
                              {mediaType === "tv" && items.lastAirDate
                                ? `-${items.lastAirDate.substring(0, 4)}`
                                : null}
                            </Text>
                            <Text>{items.formattedRuntime}</Text>
                            <Text
                              fz="xs"
                              px="xs"
                              c="brand.3"
                              fw={700}
                              sx={(theme) => ({
                                border: "1px solid",
                                borderColor: theme.colors.brand[4],
                              })}
                            >
                              {items.certification}
                            </Text>
                          </Group>
                          <Text>{items.tagline}</Text>
                          <Spoiler
                            mt="xl"
                            maxHeight={75}
                            showLabel="Show more"
                            hideLabel="Hide"
                          >
                            {items.overview}
                          </Spoiler>
                          <Grid mt="md">
                            <Grid.Col md={6}>
                              {" "}
                              <Text fz="sm">Budget</Text>
                              <Text fw={500}>
                                {" "}
                                ${items.budget?.toLocaleString()}
                              </Text>
                            </Grid.Col>
                            <Grid.Col md={6}>
                              <Text fz="sm">Directed by:</Text>
                              <Flex>
                                {items.directingCrew
                                  ?.slice(0, 2) // Use the slice() method to get the first three items
                                  .map((crew, index) => (
                                    <Text fw={500} key={crew.id}>
                                      {crew.name}
                                      {items.genres &&
                                      index !== 2 &&
                                      index !==
                                        items.genres.slice(0, 2).length - 1 ? (
                                        <>,&nbsp;</>
                                      ) : null}
                                    </Text>
                                  ))}
                              </Flex>
                            </Grid.Col>
                            <Grid.Col md={6}>
                              <Text fz="sm">Box Office:</Text>
                              <Text fw={500}>
                                {" "}
                                ${items.revenue?.toLocaleString()}
                              </Text>
                            </Grid.Col>
                            <Grid.Col md={6}>
                              <Text fz="sm">Genres:</Text>
                              <Flex>
                                {items.genres
                                  ?.slice(0, 3) // Use the slice() method to get the first three items
                                  .map((genre, index) => (
                                    <Text
                                      fw={500}
                                      key={genre.id}
                                      // mr="xs"
                                      // px="sm"
                                      // sx={{
                                      //   border: "1px solid",
                                      //   borderColor: "brand.4",
                                      //   borderRadius: "20px",
                                      // }}
                                    >
                                      {genre.name}
                                      {items.genres &&
                                      index !== 2 &&
                                      index !==
                                        items.genres.slice(0, 3).length - 1 ? (
                                        <>,&nbsp;</>
                                      ) : null}
                                    </Text>
                                  ))}
                              </Flex>
                            </Grid.Col>
                          </Grid>
                        </Box>
                      </Grid.Col>
                    </Grid>
                  </Container>
                </Box>
              </AspectRatio>
            </BackgroundImage>
          </div>
        );
      }}
    </Palette>
  );
}
