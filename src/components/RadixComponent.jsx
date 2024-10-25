//You can import a component from Radix or another library to use in your app
import * as Dialog from '@radix-ui/react-dialog';

function EditProfileDialog({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger className="button">Edit Profile</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed bg-white p-6 rounded-md">
          <Dialog.Title>Edit Profile</Dialog.Title>
          {/* Add form inputs for editing profile */}
          <Dialog.Close className="button">Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
