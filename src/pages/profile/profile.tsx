import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import PersonalInfoSection from "./components/personal-info";
import AddressBookSection from "./components/address-book";
import ProfileModal from "../../components/profile-modal";
import AddressModal from "../../components/address-modal";
import { ConfirmModal } from "../../components/confirm-modal";
import type { UserProfile, Address } from "../../types";
import SectionHeader from "../../components/ui/secion-header";
import SellerStoresSection from "./components/seller-store-section";

const Profile: React.FC = () => {
  // server states:
  const [profile, setProfile] = useState<UserProfile>({
    id: "u1",
    name: "Ahsan Ali",
    email: "ahsan@example.com",
    phone: "+92 300 0000000",
    birthDate: "1990-01-01",
    address: "st #2, gulshan adeel colony, kanganiwala, gujranawla",
    vehicleRegNo: "GAK7451",
    companyPhone: "+92 333 3333333",
    gender: "male",
    role: "super admin",
  });
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "a1",
      name: "Home",
      addressLine1: "House 123, Street 45",
      addressLine2: "",
      postalCode: "54000",
      city: "Lahore",
      province: "Punjab",
      phone: "+92 300 1111111",
      isDefault: true,
      type: "home",
    },
    {
      id: "a2",
      name: "Office",
      addressLine1: "Office 9, Building X",
      addressLine2: "Floor 3",
      postalCode: "54001",
      city: "Lahore",
      province: "Punjab",
      phone: "+92 300 2222222",
      isDefault: false,
      type: "office",
    },
  ]);
  const mockStores = [
    {
      id: "1",
      name: "Gadget Galaxy",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: "2",
      name: "Tech Haven",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
      id: "3",
      name: "Urban Style Hub",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },
  ];

  // local states:
  const [openAddrModal, setOpenAddrModal] = useState(false);
  const [editingAddr, setEditingAddr] = useState<Address | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [toDelete, setToDelete] = useState<Address | null>(null);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleAdd = () => {
    setEditingAddr(null);
    setOpenAddrModal(true);
  };

  const handleEdit = (a: Address) => {
    setEditingAddr(a);
    setOpenAddrModal(true);
  };

  const handleSaveAddress = (addr: Address) => {
    setAddresses((prev) => {
      let next = prev.filter((p) => p.id !== addr.id);
      if (addr.isDefault) {
        next = next.map((p) => ({ ...p, isDefault: false }));
      }
      return [addr, ...next];
    });
  };

  const handleDeleteRequest = (a: Address) => {
    setToDelete(a);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (!toDelete) return;
    setAddresses((prev) => prev.filter((p) => p.id !== toDelete.id));
    setToDelete(null);
    setOpenConfirm(false);
  };
  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
  };

  const handleSelectStore = (storeId: string) => {
    console.log("Go to store:", storeId);
    // navigate(`/seller/store/${storeId}`);
  };

  const handleCreateStore = () => {
    console.log("Redirect to create store page");
    // navigate("/seller/store/create");
  };

  return (
    <Container sx={{ py: 4 }}>
      <Box>
        <SectionHeader title="Profile" />
        <PersonalInfoSection
          profile={profile}
          onEdit={() => setOpenProfileModal(true)}
        />
        <AddressBookSection
          addresses={addresses}
          onEdit={handleEdit}
          onDelete={handleDeleteRequest}
          onAdd={handleAdd}
        />
        <SellerStoresSection
          stores={mockStores}
          onSelectStore={handleSelectStore}
          onCreateStore={handleCreateStore}
        />

        <AddressModal
          open={openAddrModal}
          title={"Edit/Add"}
          initial={editingAddr || null}
          onClose={() => setOpenAddrModal(false)}
          onSave={handleSaveAddress}
        />
        <ConfirmModal
          open={openConfirm}
          title="Delete address"
          description="Are you sure you want to delete this address?"
          onCancel={() => setOpenConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
        <ProfileModal
          open={openProfileModal}
          initial={profile}
          onClose={() => setOpenProfileModal(false)}
          onSave={(data) => setProfile(data)}
        />
      </Box>
    </Container>
  );
};

export default Profile;
