<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!--app-message-->

    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 rounded-mb shadown-md bg-light-grey"
    >
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <div v-if="dataLoaded">
      <!--General-Workout-->
      <div
        class="
          flex flex-col
          items-center
          p-8
          rounded-md
          shadow-md
          bg-light-grey
          relative
        "
      >
        <div v-if="user" class="flex absolute lef-2 top-2 gap-x-2">
          <div
            @click="editMode"
            class="
              h-7
              w-7
              rounded-full
              flex
              justify-center
              items-center
              cursor-pointer
              bg-at-light-green
              shadow-lg
            "
          >
            <img
              class="h-3.5 w-auto"
              src="@/assets/images/pencil-light.png"
              alt=""
            />
          </div>
          <div
            @click="deleteWorkout"
            class="
              h-7
              w-7
              rounded-full
              flex
              justify-center
              items-center
              cursor-pointer
              bg-at-light-green
              shadow-lg
            "
          >
            <img
              class="h-3.5 w-auto"
              src="@/assets/images/trash-light.png"
              alt=""
            />
          </div>
        </div>

        <img
          v-if="data.workoutType === 'cardio'"
          class="h-24 w-auto"
          src="@/assets/images/running-light-green.png"
          alt=""
        />

        <img
          v-else
          class="h-24 w-auto"
          src="@/assets/images/dumbbell-light-green.png"
          alt=""
        />

        <span
          class="
            mt-6
            py-1.5
            px-5
            text-xs text-white
            bg-at-light-green
            rounded-lg
            shadow-md
          "
        >
          {{ data.workoutType }}
        </span>

        <div class="w-full mt-6">
          <input
            v-if="edit"
            type="text"
            class="p-2 w-full text-grey-500 focus:outline-none"
            v-model="data.workoutName"
          />
          <h1 v-else class="text-at-light-green text-2x1 text-center">
            {{ data.workoutName }}
          </h1>
        </div>
      </div>

      <!--exercise  -->
      <div
        class="
          mt-10
          p-8
          rounded-md
          flex flex-col
          item-center
          bg-light-grey
          shadow-md
        "
      >
        <!--strength-training -->
        <div
          v-if="data.workoutType === 'strength'"
          class="flex flex-col gap-y-4 w-full"
        >
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <div class="flex flex-2 flex-col md:w=1/3">
              <lable
                for="exercise-name"
                class="mb-1 text-sm text-at-light-green"
              >
                Exercise
              </lable>
              <input
                v-if="edit"
                id="exercise-name"
                class="p-2 w-full ext-gray-500 focus:outline-none"
                type="text"
                v-model="item.exercise"
              />
              <p v-else>{{ item.exercise }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <lable for="sets" class="mb-1 text-sm text-at-light-green">
                Sets
              </lable>
              <input
                v-if="edit"
                id="sets"
                class="p-2 w-full ext-gray-500 focus:outline-none"
                type="text"
                v-model="item.sets"
              />
              <p v-else>{{ item.sets }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <lable for="reps" class="mb-1 text-sm text-at-light-green">
                Reps
              </lable>
              <input
                v-if="edit"
                id="reps"
                class="p-2 w-full ext-gray-500 focus:outline-none"
                type="text"
                v-model="item.reps"
              />
              <p v-else>{{ item.reps }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <lable for="weight" class="mb-1 text-sm text-at-light-green">
                Weight(LB's)
              </lable>
              <input
                v-if="edit"
                id="weight"
                class="p-2 w-full ext-gray-500 focus:outline-none"
                type="text"
                v-model="item.weight"
              />
              <p v-else>{{ item.weight }}</p>
            </div>
            <img
              v-if="edit"
              @click="deleteExercise(item.id)"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt=""
            />
          </div>

          <button
            @click="addExercise"
            v-if="edit"
            type="button"
            class="
              py-2
              px-6
              rounded-sm
              self-start
              text-sm text-white
              bg-at-light-green
              duration-200
              border-solid border-2 border-transparent
              hover:border-at-light-green
              hover:bg-white
              hover:text-at-light-green
            "
          >
            Add Exercise
          </button>
        </div>

        <!--Cardio -->
        <div v-else class="flex flex-col gap-y-4 w-full">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <div class="flex flex-2 flex-col md:w=1/3">
              <lable for="cardioType" class="mb-1 text-sm text-at-light-green">
                Type
              </lable>
              <select
                v-if="edit"
                id="cardioType"
                class="p-2 w-full ext-gray-500 focus:outline-none"
                type="text"
                v-model="item.cardioType"
              >
                <option value="#">Select Type</option>
                <option value="Run">Run</option>
                <option value="Walk">Walk</option>
              </select>
              <p v-else>{{ item.cardioType }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <lable for="distance" class="mb-1 text-sm text-at-light-green">
                Distance
              </lable>
              <input
                v-if="edit"
                id="distance"
                class="p-2 w-full ext-gray-500 focus:outline-none"
                type="text"
                v-model="item.distance"
              />
              <p v-else>{{ item.distance }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <lable for="duration" class="mb-1 text-sm text-at-light-green">
                Duration
              </lable>
              <input
                v-if="edit"
                id="duration"
                class="p-2 w-full ext-gray-500 focus:outline-none"
                type="text"
                v-model="item.duration"
              />
              <p v-else>{{ item.duration }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <lable for="pace" class="mb-1 text-sm text-at-light-green">
                Pace
              </lable>
              <input
                v-if="edit"
                id="pace"
                class="p-2 w-full ext-gray-500 focus:outline-none"
                type="text"
                v-model="item.pace"
              />
              <p v-else>{{ item.pace }}</p>
            </div>
            <img
              v-if="edit"
              @click="deleteExercise(item.id)"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="@/assets/images/trash-light-green.png"
              alt=""
            />
          </div>

          <button
            v-if="edit"
            @click="addExercise"
            type="button"
            class="
              py-2
              px-6
              rounded-sm
              self-start
              text-sm text-white
              bg-at-light-green
              duration-200
              border-solid border-2 border-transparent
              hover:border-at-light-green
              hover:bg-white
              hover:text-at-light-green
            "
          >
            Add Exercise
          </button>
        </div>
      </div>
      <!--update -->

      <button
        v-if="edit" @click="update"
        type="button"
        class="
          mt-10
          py-2
          px-6
          rounded-sm
          self-start
          text-sm text-white
          bg-at-light-green
          duration-200
          border-solid border-2 border-transparent
          hover:border-at-light-green hover:bg-white hover:text-at-light-green
        "
      >
        Update Workout
      </button>
    </div>
    
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import store from "../store/index";
import { useRoute, useRouter } from "vue-router";
import { uid } from "uid";
export default {
  name: "view-workout",
  setup() {
    // Create data / vars
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const route = useRoute();
    const user = computed(() => store.state.user);
    const router = useRouter();
    // Get current Id of route

    const currentID = route.params.workoutID;

    // Get workout data

    const getData = async () => {
      try {
        const { data: workouts, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("id", currentID);
        if (error) throw error;
        data.value = workouts[0];
        dataLoaded.value = true;
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    getData();

    // Delete workout

    const deleteWorkout = async () => {
      try {
        const { error } = await supabase
          .from("workouts")
          .delete()
          .eq("id", currentID);
        if (error) throw error;
        router.push({ name: "Home" });
      } catch (error) {
        errorMsg.value = `Error:${error.message}`;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    // Edit mode
    const edit = ref(null);
    const editMode = () => {
      edit.value = !edit.value;
    };
    // Add exercise

    const addExercise = () => {
      if (data.value.workoutType === "strength") {
        data.value.exercises.push({
          id: uid(),
          exercise: "",
          sets: "",
          reps: "",
          weight: "",
        });
        return;
      }

      data.value.exercises.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: "",
      });
    };

    // Delete exercise

    const deleteExercise = (id) => {
      if (data.value.exercises.length > 1) {
        data.value.exercises = data.value.exercises.filter(
          (exercise) => exercise.id !== id
        );
        return;
      }
      errorMsg.value = "Error.Cannot remove, need at least have one exercise";
      setTimeout(() => {
        errorMsg.value = false;
      }, 5000);
    };

    // Update Workout

    const update = async () => {
      try {
        const { error } = await supabase
          .from("workouts")
          .update({
            workoutName: data.value.workoutName,
            exercises: data.value.exercises,
          })
          .eq("id", currentID);
        if (error) throw error;
        edit.value = false;
        statusMsg.value = "Success:Workout updated !";
        setTimeout(() => {
          statusMsg.value = false;
        }, 5000);
      } catch (error) {
        errorMsg.value`Error:${error.message}`;
        setTimeout(() => {
          statusMsg.value = false;
        }, 5000);
      }
    };

    return {
      statusMsg,
      data,
      dataLoaded,
      errorMsg,
      edit,
      editMode,
      user,
      deleteWorkout,
      addExercise,
      deleteExercise,
      update,
    };
  },
};
</script>
