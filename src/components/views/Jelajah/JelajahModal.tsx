import { IKegiatan } from "@/types/Kegiatan";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@heroui/react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  data: IKegiatan | null;
}

const JelajahModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, data } = props;
  const doc = data?.dokumentasi;
  console.log("data", doc);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{data?.name}</ModalHeader>
        <ModalBody>
          <Swiper
            pagination={{
              // dynamicBullets: true,
              clickable: true,
            }}
            spaceBetween={30}
            loop
            modules={[Autoplay, Pagination]}
            className="h-full w-full "
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {doc?.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="relative w-full h-64">
                  {" "}
                  {/* 🔥 WAJIB */}
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE}${item.url}`}
                    alt={data?.name ?? "dokumentasi"}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="100vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JelajahModal;
