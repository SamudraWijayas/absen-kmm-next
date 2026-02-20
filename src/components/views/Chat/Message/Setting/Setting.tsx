import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
}

// Tema sekarang semua pakai image
const themes = [
  { key: "default", label: "Default", image: "/images/bg-chat/tema-default.png" },
  { key: "wa", label: "Tema WA", image: "/images/bg-chat/tema-wa.png" },
  { key: "kaktus", label: "Tema Kaktus", image: "/images/bg-chat/tema-kaktus.png" },
  { key: "lemon", label: "Tema Lemon", image: "/images/bg-chat/tema-lemon.png" },
  { key: "kaktus2", label: "Tema Kaktus 2", image: "/images/bg-chat/tema-kaktus-2.png" },
  { key: "kucing", label: "Tema Kucing", image: "/images/bg-chat/tema-kucing.png" },
  { key: "hokage", label: "Tema Hokage", image: "/images/bg-chat/tema-hokage.png" },
  { key: "naruto", label: "Tema Naruto", image: "/images/bg-chat/tema-naruto.png" },
  { key: "totoro", label: "Tema Totoro", image: "/images/bg-chat/tema-totoro.png" },
  { key: "rilakuma", label: "Tema Rilakuma", image: "/images/bg-chat/tema-rilakuma.png" },
];

const Setting = ({
  isOpen,
  onClose,
  onOpenChange,
  activeTheme,
  setActiveTheme,
}: PropTypes) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-md ">
        <ModalHeader className="text-lg font-semibold ">
          Ubah tampilan chat
        </ModalHeader>

        <ModalBody>
          <div className="grid grid-cols-4 gap-3 ">
            {themes.map((theme) => {
              const isActive = activeTheme === theme.key;

              return (
                <div
                  key={theme.key}
                  onClick={() => {
                    setActiveTheme(theme.key);
                    onClose();
                  }}
                  className={`cursor-pointer w-full h-28 rounded-xl border-2 ${
                    isActive ? "border-primary" : "border-transparent"
                  } flex items-center justify-center transition`}
                  style={{
                    backgroundImage: `url(${theme.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  title={theme.label}
                >
                  {isActive && <span className="text-white font-bold">✓</span>}
                </div>
              );
            })}
          </div>
        </ModalBody>

        {/* <ModalFooter className="justify-end gap-2">
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default Setting;
