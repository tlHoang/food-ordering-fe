import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

const ImageSection = () => {
  const { control, watch } = useFormContext();

  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Hình ảnh</h2>
        <FormDescription>
          Hình ảnh cho nhà hàng sẽ hiển thị trên mục tìm kiếm
        </FormDescription>
      </div>

      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) => {
                    const file = event.target.files ? event.target.files[0] : null;
                    if (file) {
                      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                      if (!allowedTypes.includes(file.type)) {
                        toast.error("Chỉ chấp nhận file ảnh định dạng jpg, jpeg, png");
                        event.target.value = '';
                        return;
                      }
                      if (file.size > 5 * 1024 * 1024) {
                        toast.error("Ảnh phải nhỏ hơn 5MB");
                        event.target.value = '';
                        return;
                      }
                      field.onChange(file);
                    }
                  }

                    // field.onChange(
                    //   event.target.files ? event.target.files[0] : null
                    // )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;