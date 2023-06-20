import { AspectRatio, Box, Button, Modal, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { FaPlay } from 'react-icons/fa';
import { Video } from '../../Types/types';

interface trailerProps {
  trailer: Video;
}

export default function Trailer({ trailer }: trailerProps) {
  // responsive styles
  const mobile = useMediaQuery('(max-width: 30em)');

  const theme = useMantineTheme();

  const videoUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`;

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        // withCloseButton={false}
        title={`${trailer.name || trailer.title} Official Trailer`}
        size="80%"
        withOverlay
        styles={() => ({
          body: {
            padding: 0,
          },
          header: {
            backgroundColor: theme.colors.dark[9],
          },
        })}
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.9,
          blur: 3,
        }}
      >
        <Box>
          <Box>
            <AspectRatio ratio={16 / 9}>
              <iframe
                title="Trailer"
                id="ytplayer"
                frameBorder="0"
                allowFullScreen
                src={videoUrl}
              />
            </AspectRatio>
          </Box>
        </Box>
      </Modal>
      {mobile ? (
        <Button
          color="dark.6"
          fullWidth
          component="a"
          href={videoUrl}
          mt="md"
          leftIcon={<FaPlay />}
          target="_blank"
          styles={{
            root: {
              '&:hover': {
                // backgroundColor: theme.colors.yellow[8],
                color: theme.colors.yellow[5],
              },
              color: theme.colors.dark[0],
            },
          }}
        >
          Watch Trailer
        </Button>
      ) : (
        <Button
          color="dark.6"
          onClick={open}
          fullWidth
          leftIcon={<FaPlay />}
          mt="md"
          styles={{
            root: {
              '&:hover': {
                // backgroundColor: theme.colors.yellow[8],
                color: theme.colors.yellow[5],
              },
              color: theme.colors.dark[0],
            },
          }}
        >
          Watch Trailer
        </Button>
      )}
    </Box>
  );
}
